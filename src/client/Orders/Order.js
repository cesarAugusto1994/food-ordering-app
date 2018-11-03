import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, Button } from 'react-native';
import { connect } from 'redux-zero/react';
import uuidv4 from 'uuid/v4';
import {showMessage} from 'react-native-flash-message';

import actions from '../../store/actions';
import Card from '../../components/OrderItem';
import OrderButton from '../../components/Button';
import Message from '../../components/Error';
import Modal from 'react-native-modalbox';
import RenderIf from '../../components/RenderIf';

import { colors, fonts } from '../../theme';
import { Mutation } from 'react-apollo';
import { CREATE_ORDER } from '../../graphql/client';
import OrderForm from '../../components/OrderForm';


const createOrder = async (mutationFn,mutation, state, {additionalInfo, userPhoneNumber}) => {
  state.card.forEach(order => {
    const variables = {
      orderId: uuidv4(),
      userId: state.user.userId,
      restaurantId: order.restaurantId,
      ownerId: order.ownerId,
      itemPrice: order.itemPrice,
      itemName: order.itemName,
      userPhoneNumber,
      restaurantPhoneNumber: order.restaurantPhoneNumber,
      state: 'enviado',
      additionalInfo,
      quantity: order.quantity,
      userWillPay: order.quantity * order.itemPrice
    };

    mutationFn({
      mutation,
      variables,
      optimisticResponse: {
        createOrders: { ...variables, __typename: 'Order' },
        __typename: 'Mutation'
      }
    })
  })
}
class Order extends React.Component {
  state = {
    isOpen: false,
    value: {
      userPhoneNumber: '923302679',
      additionalInfo: 'OKozkzokdko'
    }
  }
  onChange = (value) => {
    this.setState({value})
  }

  _createOrder = (fn, state) => {
    const {userPhoneNumber, additionalInfo} = this.state.value;
    createOrder(fn, CREATE_ORDER, state, {userPhoneNumber, additionalInfo})
      .then(success => {
        console.log({success});
        showMessage({type: 'success', message: 'A sua encomenda foi enviada ao restaurante!'});
        this.props.resetCard();
        this.setState({isOpen: false});
      })
      .catch(error => console.log({error}) || showMessage({
        type: 'danger',
        message: 'Ocorreu-se algum errro',
        description: 'Deve-se à um ou mais problemas com os dados do item',
        backgroundColor: "red"
      }))
  }

  openModal = () => {
    this.setState({isOpen: true});
  }

  closeModal = () => {
    this.setState({isOpen: false});
  }
  render() {
    const {card, user} = this.props.store.getState();
    console.log({ffffffffffffsss: this.props, card})
    return (
      <Mutation mutation={CREATE_ORDER}>
        {(mutationFn, {data, client}) => (
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
                <View style={styles.orderBtn}>
                  <OrderButton
                    onPress={this.openModal}
                    buttonStyle={{backgroundColor: colors.green}}
                    text=" Encomendar"
                  />
                </View>
              )}
            />
            <Modal
              keyboardTopOffset={0}
              isOpen={this.state.isOpen}
              onClosed={this.closeModal}
              backdropPressToClose={false}
              >
                <OrderForm
                  value={this.state.value}
                  onChange={this.onChange.bind(this)}
                  onOrder={this._createOrder.bind(this, mutationFn, {card, user})}
                  amount={getTotalAmount(card)}
                />
            </Modal>
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
  orderBtn: {
    width: '100%',
    padding: 20
  },
  scroll: {
    width: '100%'
  }
})

const mapToProps = ({ card, user, removeFromCard }) => ({ card, user, removeFromCard })

export default connect(mapToProps, actions)(Order);
