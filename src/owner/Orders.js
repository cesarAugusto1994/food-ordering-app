import React from 'react';
import { View, StyleSheet, FlatList, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import call from 'react-native-phone-call';

import Card from '../components/OwnerOrder';
import Button from '../components/Button';
import Message from '../components/Error';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import TouchableLabel from '../components/TouchableLabel';

import { colors, fonts } from '../theme';
import { Subscription, Query, ApolloConsumer } from 'react-apollo';
import { ORDER_CREATE, GET_ORDER, UPDATE_ORDER } from '../graphql/owner';
import {GET_LOCAL_USER} from '../client/Profile/Profile';

class OwnerOrder extends React.Component {
  openModal = (client, order) => {
    const message = `Pedido adicional: ${order.additionalInfo}`;
    const args = {
      number: order.restaurantPhoneNumber,
      prompt: false
    }

    if(order.state === 'enviado') {
      return Alert.alert(
        'Informaçoes',
        message,
        [
          {text: 'Rejeitar', onPress: () => this.updateOrderStatus(client, order.orderId, 'rejeitado'), style: 'cancel'},
          {text: 'Ligar para o cliente', onPress: async () => await call(args)},
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
          {text: 'Ligar para o cliente', onPress: async () => await call(args)},
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
          {text: 'Ligar para o cliente', onPress: async () => await call(args)},
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
          {text: 'Ligar para o cliente', onPress: async () => await call(args)},
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
        {text: 'Ligar para o cliente', onPress: async () => await call(args)}
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
    .catch(err => showMessage({
      type: 'danger',
      message: 'Houve um erro ao tentar actualizar o estado',
      backgroundColor: 'red'
    }))
  }
  render() {
    return (
      <ApolloConsumer>
        {cache => {
          const {
            user: { id: ownerId },
          } = cache.readQuery({ query: GET_LOCAL_USER });
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
                      let orders = data.orders;
                      if(newOrder && newOrder.onCreateOrder){
                        orders.unshift({...newOrder.onCreateOrder})
                      }
                      return (
                        <View style={styles.container}>
                          <FlatList
                            style={styles.scroll}
                            data={orders}
                            keyExtractor={(item, index) => item.foodId}
                            renderItem={({item}) => (
                              <TouchableOpacity onPress={() => this.openModal(client, item)} key={item.foodId}>
                                <Card
                                  key={item.foodId}
                                  name={item.itemName}
                                  quantity={item.quantity}
                                  foodId={item.foodId}
                                  status={item.state}
                                />
                              </TouchableOpacity>

                            )}
                          />
                        </View>
                      )
                    }}
                  </Query>
                )
              }}
            </Subscription>
          )
        }}
      </ApolloConsumer>
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

export default OwnerOrder;
