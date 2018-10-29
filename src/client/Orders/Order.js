import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'redux-zero/react';
import uuidv4 from 'uuid/v4';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import actions from '../../store/actions';
import Card from '../../components/OrderItem';
import OrderButton from '../../components/Button';
import Message from '../../components/Error';
import RenderIf from '../../components/RenderIf';

import { colors, fonts } from '../../theme';
import { Mutation } from 'react-apollo';
import { CREATE_ORDER } from '../../graphql/client';
import OrderForm from '../../components/OrderForm';


const createOrder = async (mutationFn,mutation, state, {additionalInfo, phoneNumber}) => {
  const orderId = uuidv4();
  state.card.forEach(order => {
    const variables = {
      orderId,
      userId: state.user.userId,
      restaurantId: order.restaurantId,
      itemPrice: order.itemPrice,
      itemName: order.itemName,
      phoneNumber,
      additionalInfo,
      quantity: order.quantity,
      userWillPay: order.quantity * order.itemPrice
    };

    return mutationFn({
      mutation,
      variables,
      optimisticResponse: {
        createOrders: { ...variables, __typename: 'Orders' },
        __typename: 'Mutation'
      }
    })
      .then(succ => console.log({succ}))
      .catch(err => console.log({err}))
  })
}
class Order extends React.Component {
  state = {
    value: {
      phoneNumber: '923302679',
      additionalInfo: 'OKozkzokdko'
    }
  }
  onChange = (value) => {
    this.setState({value})
  }

  _createOrder = (fn, state) => {
    const {phoneNumber, additionalInfo} = this.state.value;
    createOrder(fn, CREATE_ORDER, state, {phoneNumber, additionalInfo})
      .then(success => console.log({success}))
      .catch(error => console.log({error}))
  }

  render() {
    const {card, user} = this.props.store.getState();
    return (
      <Mutation mutation={CREATE_ORDER}>
        {(mutationFn, {data, client}) => (
          <View style={styles.container}>
            <View style={styles.scroll}>
            <ScrollView>
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
            </View>
            <RenderIf
              condition={card.length !== 0}
              children={() => (
                <KeyboardAwareScrollView style={styles.keyboardAvoidingView} extraScrollHeight={100}>
                  <OrderForm
                    onOrder={() => {}}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    onOrder={this._createOrder.bind(this, mutationFn, {card, user})}
                    amount={getTotalAmount(card)}
                  />
                </KeyboardAwareScrollView>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#cccccc'
  },
  scroll: {
    width: '100%',
    position:'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1
  },
  keyboardAvoidingView: {
    width: '100%',
    zIndex: 4,
    flex: 1,
    justifyContent: 'flex-end'
  }
})

const mapToProps = ({ card, user }) => ({ card, user })

export default connect(mapToProps, actions)(Order);
