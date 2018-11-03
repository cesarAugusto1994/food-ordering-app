import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'redux-zero/react';
import uuidv4 from 'uuid/v4';
import Modal from 'react-native-modalbox';

import actions from '../store/actions';
import Card from '../components/OwnerOrder';
import Button from '../components/Button';
import Message from '../components/Error';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import TouchableLabel from '../components/TouchableLabel';

import { colors, fonts } from '../theme';
import { Subscription, Query } from 'react-apollo';
import { ORDER_CREATE, GET_ORDER, UPDATE_ORDER } from '../graphql/owner';

class OwnerOrder extends React.Component {
  openModal = (client, order) => {
    const message = `Pedido adicional: ${order.additionalInfo}
      Tel: ${order.userPhoneNumber}
    `;

    if(order.state === 'enviado') {
      return Alert.alert(
        'Informaçoes',
        message,
        [
          {text: 'Rejeitar', onPress: () => this.updateOrderStatus(client, order.orderId, 'rejeitado'), style: 'cancel'},
          {text: 'Aceitar', onPress: () => this.updateOrderStatus(client, order.orderId, 'aceite')},
        ],
        { cancelable: false }
        )
    }
    if(order.state === 'aceite') {
      return Alert.alert(
        'Estado',
        'Selecione uma das opçoes abaixo listadas',
        [
          {text: 'Fechar', onPress: () => {}, style: 'cancel'},
          {text: 'Preparando', onPress: () => this.updateOrderStatus(client, order.orderId, 'preparando')}
        ],
        { cancelable: false }
      )
    }
    if(order.state === 'preparando') {
      return Alert.alert(
        'Estado',
        'Selecione uma das opçoes abaixo listadas',
        [
          {text: 'Fechar', onPress: () => {}, style: 'cancel'},
          {text: 'Enviando', onPress: () => this.updateOrderStatus(client, order.orderId, 'enviando')}
        ],
        { cancelable: false }
      )
    }
    if(order.state === 'enviando') {
      return Alert.alert(
        'Estado',
        'Selecione uma das opçoes abaixo listadas',
        [
          {text: 'Fechar', onPress: () => {}, style: 'cancel'},
          {text: 'Entregue', onPress: () => this.updateOrderStatus(client, order.orderId, 'entregue')}
        ],
        { cancelable: false }
      )
    }
    return Alert.alert(
      'Estado',
      `Este pedido foi ${order.state}`,
      [
        {text: 'Fechar', onPress: () => {}, style: 'cancel'},
        {text: 'Ok', onPress: () => {}},
      ],
      { cancelable: false }
    )
  }
  updateOrderStatus = (client, orderId, status) => {
    client.mutate({mutation: UPDATE_ORDER, variables: {orderId, status}})
    .then(({data}) => {
      client.resetStore();
      return showMessage({type: 'success', message: 'Estado actualizado'})
    })
    .catch(err => console.log({errrrrrd: err}) || showMessage({
      type: 'danger',
      message: 'Houve um erro ao tentar actualizar o estado',
      backgroundColor: 'red'
    }))
  }
  render() {
    const {user: {ownerId}} = this.props.store.getState();
    return (
      <Subscription subscription={ORDER_CREATE} variables={{ownerId}}>
        {({data: newOrder, loading}) => {
          return (
            <Query query={GET_ORDER} variables={{ownerId}} fetchPolicy='cache-and-network'>
              {({data, loading, err, client}) => {
                if(loading) return <Spinner text="Carregando os seus pedidos ..."/>
                if(err) return (
                  <Error
                    emoji='😰'
                    text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos a lista de seus pedidos. Feche e volte a abrir a aplicaçao!`}
                  />
                )
                let orders = data.listOrders.items;
                if(newOrder && newOrder.onCreateOrder){
                  orders.unshift({...newOrder.onCreateOrder})
                }
                return (
                  <View style={styles.container}>
                    <ScrollView style={styles.scroll}>
                      {
                        orders.map(order => console.log({ooooooo: order}) || (
                          <TouchableOpacity onPress={() => this.openModal(client, order)}>
                            <Card
                              index={order.foodId}
                              name={order.itemName}
                              quantity={order.quantity}
                              foodId={order.foodId}
                              status={order.state}
                            />
                          </TouchableOpacity>
                        ))
                      }
                    </ScrollView>
                  </View>
                )
              }}
            </Query>
          )
        }}
      </Subscription>
    )
  }
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
  }
})

const mapToProps = ({ restaurantId }) => ({ restaurantId })

export default connect(mapToProps, actions)(OwnerOrder);
