
import React from 'react';
import { View, StyleSheet, FlatList, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'redux-zero/react';
import call from 'react-native-phone-call';

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

  openModal = (order) => {
    let message = 'Nao conseguimos obter o estado do seu pedido';

    if (order.state === 'enviado') {
      message = 'O seu pedido foi enviado ao restaurante';
    }
    if (order.state === 'rejeitado') {
      message = 'O seu pedido foi rejeitado';
    }
    if (order.state === 'aceite') {
      message = 'O seu pedido foi aceite';
    }
    if (order.state === 'preparando') {
      message = 'O seu pedido esta a ser preparado';
    }
    if (order.state === 'enviando') {
      message = 'O seu pedido esta a caminho';
    }
    if (order.state === 'entregue') {
      message = `O seu pedido foi entregue`;
    }

    const args = {
      number: order.restaurantPhoneNumber,
      prompt: false
    }

    Alert.alert(
      'Estado do seu pedido',
      message,
      [
        {text: 'OK', onPress: () => {}},
        {text: 'Ligar para o restaurante', onPress: async () => await call(args)},
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
              <FlatList
                style={styles.scroll}
                data={data && data.orders}
                keyExtractor={(item, index) => item.foodId}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => this.openModal(item)}>
                    <Card
                      index={item.foodId}
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
