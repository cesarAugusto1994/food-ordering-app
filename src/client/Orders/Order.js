import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'redux-zero/react';


import actions from '../../store/actions';
import Card from '../../components/OrderItem';
import OrderButton from '../../components/Button';
import Message from '../../components/Error';

import { colors, fonts } from '../../theme';

class Search extends React.Component {
  render() {
    const {card} = this.props.store.getState();
    return (
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
        <OrderButton
          onPress={() => {}}
          iconName='shopping-cart'
          text=" Encomendar"
        />
      </View>
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
