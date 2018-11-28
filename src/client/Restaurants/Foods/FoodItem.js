import React from 'react'
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";


import { Query, graphql, ApolloConsumer } from "react-apollo";
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


const addToCard = async (cache, card, {item, quantity}) => {
  const allEqual = (card, restaurantId) => card.every(food => food.restaurantId === restaurantId);
  const inArray = (arr, item) => arr.some(el => el.foodId === item.foodId);

  const addOrMerge = (card, item) => {
    if (inArray(card, item)) {
      return card.map(el => {
        if(el.foodId === item.foodId){
          el.quantity += item.quantity;
          return { ...el, __typename: 'CardItem'};
        }
        return { ...el, __typename: 'CardItem'};
      })
    }
    card.push({ ...item, __typename: 'CardItem'});
    return card
  };

  if(card.length === 0) {
    console.log('iii', item)
    return cache.writeData({
      data: {
        shopCard: {
          items: [...card, { ...{ ...item, __typename: 'CardItem'}, quantity}],
          __typename: 'Card'
        }
      }
    });
  }

  if(allEqual(card, item.restaurantId)) {
    return cache.writeData({
      data: {
        shopCard: {
          items: [ ...addOrMerge(card, { ...item, quantity}) ],
          __typename: 'Card'
        }
      }
    });
  }
  return Promise.reject();
};

class Foods extends React.Component {
  addToCart = (
    cache,
    card,
    foodId,
    userId,
    itemName,
    itemPrice,
    restaurantId,
    ownerId,
    restaurantPhoneNumber,
    quantity
    ) => {
    addToCard(
      cache,
      card,
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
    const {navigation} = this.props;
    const {goBack, state} = navigation;
    const {foodId, name, restaurantId, ownerId, price, description, image, restaurantPhoneNumber} = state.params;
    return (
      <ApolloConsumer>
        {cache => {
          const {shopCard, user} = cache.readQuery({query: gql`{
            user {
              id
            }
            shopCard @client {
              items {
                quantity
                foodId
                itemName
                itemPrice
                ownerId
                restaurantId
                restaurantPhoneNumber
                userId
              }
            }
          }`})
          console.log(shopCard)
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
                          cache,
                          shopCard.items,
                          foodId,
                          user.id,
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
      </ApolloConsumer>
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
