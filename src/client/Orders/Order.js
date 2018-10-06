import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'redux-zero/react';


import actions from '../../store/actions';
import Card from '../../components/OrderItem';
import OrderButton from '../../components/Button';
import Message from '../../components/Error';
import RenderIf from '../../components/RenderIf';

import { colors, fonts } from '../../theme';
import { Mutation } from 'react-apollo';
import { CREATE_ORDER } from '../../graphql/client';

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
            <RenderIf
              condition={card.length !== 0}
              children={() => (
                <OrderButton
                  onPress={() => {}}
                  iconName='shopping-cart'
                  text=" Encomendar"
                />
              )}
            />

          </View>
        )}
      </Mutation>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomWidth: 0.3,
    borderColor: '#cccccc'
  }
})

const mapToProps = ({ card }) => ({ card })

export default connect(mapToProps, actions)(Search);
