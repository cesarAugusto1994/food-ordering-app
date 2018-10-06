import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text } from 'react-native';
import { connect } from 'redux-zero/react';


import actions from '../../store/actions';
import Card from '../../components/OrderItem';
import OrderButton from '../../components/Button';
import Message from '../../components/Error';
import RenderIf from '../../components/RenderIf';

import { colors, fonts } from '../../theme';
import { Mutation } from 'react-apollo';
import { CREATE_ORDER } from '../../graphql/client';
import OrderForm from '../../components/OrderForm'

// orderId: $orderId
// userId: $userId
// restaurantId: $restaurantId
// itemName: $itemName
// itemPrice: $itemPrice
// userWillPay: $userWillPay
// additionalInfo: $additionalInfo
// phoneNumber: $phoneNumber
// quantity: $quantity
class Search extends React.Component {
  render() {
    const {card} = this.props.store.getState();
    return (
      <Mutation mutation={CREATE_ORDER}>
        {() => (
          <View style={styles.container}>
            <ScrollView style={styles.scroll}>
              {
                card.length !== 0 ? card.map(
                  ({itemName, itemPrice, foodId, quantity}) => (
                    <Card
                      index={foodId}
                      name={itemName}
                      quantity={quantity}
                      foodId={foodId}
                      onDelete={() => this.props.removeFromCard(foodId)}
                    />
                  )
                )
                : <Message text='O carrinho está vazio!' textStyle={{fontSize: 18}}/>
              }
            </ScrollView>
            <RenderIf
              condition={card.length !== 0}
              children={() => (
                <OrderForm
                  onOrder={() => {}}
                  amount={getTotalAmount(card)}
                />
              )}
            />

          </View>
        )}
      </Mutation>
    )
  }
}

const getTotalAmount = (card) => {
  const prices = card.map(el => el.itemPrice * el.quantity);
  const total  = prices.reduce((a, b) => a + b, 0)
  return total;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomWidth: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cccccc'
  },
  scroll: {
    width: '100%'
  },
  textAreaContainer: {
    borderColor: 'lightgrey',
    width: '70%',
    height: 120,
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
})

const mapToProps = ({ card }) => ({ card })

export default connect(mapToProps, actions)(Search);
