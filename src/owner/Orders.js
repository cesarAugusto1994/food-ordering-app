import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'redux-zero/react';
import uuidv4 from 'uuid/v4';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import actions from '../store/actions';
import Card from '../components/OwnerOrder';
import OrderButton from '../components/Button';
import Message from '../components/Error';
import Spinner from '../components/Spinner';
import Error from '../components/Error';

import { colors, fonts } from '../theme';
import { Subscription, Query } from 'react-apollo';
import { ORDER_CREATE, GET_ORDER } from '../graphql/owner';

class OwnerOrder extends React.Component {
  render() {
    const {user: {ownerId}} = this.props.store.getState();
    return (
      <Subscription subscription={ORDER_CREATE} variables={{ownerId}}>
        {({data: newOrder, loading}) => {
          return (
            <Query query={GET_ORDER} variables={{ownerId}} fetchPolicy='cache-and-network'>
              {({data, loading, err}) => {
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
                        orders.map(order => (
                          <Card
                            index={order.foodId}
                            name={order.itemName}
                            quantity={order.quantity}
                            foodId={order.foodId}
                          />
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
  },
  keyboardAvoidingView: {
    width: '100%',
    zIndex: 4,
    flex: 1,
    justifyContent: 'flex-end'
  }
})

const mapToProps = ({ restaurantId, pushOrders, orders }) => ({ restaurantId, pushOrders, orders })

export default connect(mapToProps, actions)(OwnerOrder);
