
import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'redux-zero/react';
import uuidv4 from 'uuid/v4';
import Modal from 'react-native-modalbox';

import actions from '../../store/actions';
import Card from '../../components/OwnerOrder';
import Button from '../../components/Button';
import Message from '../../components/Error';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import TouchableLabel from '../../components/TouchableLabel';

import { colors, fonts } from '../../theme';
import { Subscription, Query } from 'react-apollo';
import { GET_ORDER } from '../../graphql/client';

class OwnerOrder extends React.Component {
  openModal = (orderId, state) => {
    const message = `
      Pedido nr : ${orderId}
      Estado: ${state}
      O seu pedido sera entregue no endereço fornecido
      Para mais info. contacte o restaurante: 
    `;
    Alert.alert(
      'Informaçoes',
      message,
      [
        {text: 'Ok', onPress: () => {}},
      ],
      { cancelable: true }
    )
  }
  render() {
    const {user: {userId}} = this.props.store.getState();
    return (
      <Query query={GET_ORDER} variables={{userId}} fetchPolicy='cache-and-network'>
        {({data, loading, err}) => {
          if(loading) return <Spinner text="Carregando os seus pedidos efectuados..."/>
          if(err) return (
            <Error
              emoji='😰'
              text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos a lista de seus pedidos efectuados. Feche e volte a abrir a aplicaçao!`}
            />
          )
          return (
            <View style={styles.container}>
              <ScrollView style={styles.scroll}>
                {
                  data.listOrders.items.map(order => (
                    <TouchableOpacity onPress={() => this.openModal(order.additionalInfo, order.phoneNumber)}>
                      <Card
                        index={order.foodId}
                        name={order.itemName}
                        quantity={order.quantity}
                        foodId={order.foodId}
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
