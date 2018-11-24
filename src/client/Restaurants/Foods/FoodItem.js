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
  addToCart = (
    foodId,
    userId,
    itemName,
    itemPrice,
    restaurantId,
    ownerId,
    restaurantPhoneNumber,
    quantity
    ) => {
    this.props.addToCard(
      {
        item: {
          foodId,
          userId,
          itemName,
          itemPrice,
          restaurantId,
          ownerId,
          restaurantPhoneNumber
        },
        quantity
      })
      .then(success => {
        showMessage({
          message: "Item adicionado ao carrinho!",
          type: "success",
        })
        this.props.navigation.goBack()
      })
      .catch(err => showMessage({type: 'warning', message: 'So é possivel encomendar em um unico restaurante!'}))
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
    const {user: {userId}, navigation} = this.props;
    const {goBack, state} = navigation;
    const {foodId, name, restaurantId, ownerId, price, description, image, restaurantPhoneNumber} = state.params;
    return (
      <View style={styles.container}>
          <ScrollView>
            <FoodItemCard
              description={description}
              name={name}
              price={price}
              image={image}
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
          <View style={styles.wrapper}>
          <AddToCardButton
            onPress={
              () => this.addToCart(
                  foodId,
                  userId,
                  name,
                  price,
                  restaurantId,
                  ownerId,
                  restaurantPhoneNumber,
                  this.state.quantity
                )
            }
            buttonStyle={{backgroundColor: colors.green}}
            text=" Adicionar ao carrinho"
          />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  wrapper: {
    padding: 20
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
