import React from 'react'
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";


import { Query, graphql } from "react-apollo";
import gql from 'graphql-tag'


import { connect } from 'redux-zero/react';
import actions from '../../../store/actions';

import CircleButton from '../../../components/CircleButton';
import AddToCardButton from '../../../components/Button';
import FoodItemCard from '../../../components/FoodItem';
import Spinner from '../../../components/Spinner';
import Error from '../../../components/Error';

import { colors, fonts } from '../../../theme';
import { getFood } from '../../../graphql/owner';

class Foods extends React.Component {
  addToCart = (foodId, userId, itemName, itemPrice,restaurantId, quantity) => {
    this.props.addToCard({item:{foodId, userId, itemName, itemPrice, restaurantId}, quantity})
    showMessage({
      message: "Item adicionado ao carrinho!",
      type: "success",
    })
    this.props.navigation.goBack()
  }
  state = {
    quantity: 1
  }

  addQuantity = () => {
    if(this.state.quantity === 20) return;
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }
  substractQuantity = () => {
    if(this.state.quantity === 1) return;
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }
  render() {
    console.log('foood', this.props)
    const {user: {userId}, navigation} = this.props;
    const {goBack, state} = navigation;
    const {foodId, name: FoodName} = state.params;
    return (
      <Query query={getFood} variables={{foodId}}>
        {({loading, err, data}) => {
          if(loading) return <Spinner text="Carregando as refeiçoes ..."/>
          if(err) return (
            <Error
              emoji='😰'
              text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos esta refeiçao. Feche e volte a abrir a aplicaçao!`}
            />
          )
          return (
            <View style={styles.container}>
                <ScrollView>
                  <FoodItemCard
                    description={data.getFood.description}
                    name={data.getFood.name}
                    price={data.getFood.price}
                    image={data.getFood.image}
                    quantity={this.state.quantity}
                    imagePath={{
                      add: require('../../../assets/add.png'),
                      substract: require('../../../assets/substract.png')
                    }}
                    onPress={{
                      add: this.addQuantity,
                      substract: this.substractQuantity
                    }}
                  />
                </ScrollView>
                <AddToCardButton
                  onPress={
                    () => this.addToCart(
                        foodId,
                        userId,
                        data.getFood.name,
                        data.getFood.price,
                        data.getFood.restaurantId,
                        this.state.quantity
                      )
                  }
                  iconName='shopping-cart'
                  text=" Adicionar ao carrinho"
                />
            </View>
          )}}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

const mapToProps = ({
  user,
  addToCard,
  card,
  currentUser
}) => ({
  user,
  addToCard,
  card,
  currentUser
});

export default connect(mapToProps, actions)(Foods);
