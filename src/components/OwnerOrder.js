import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import { colors } from '../theme';
import OrderStatus from './TouchableIcon';

const icons = {
  enviado: 'send',
  aceite: 'check',
  rejeitado: 'minus-circle',
  preparando: 'hourglass-start',
  enviando: 'car',
  entregue: 'map-pin'
}
export default ({ key, quantity, name, foodId, onDelete, status }) => (
    <View style={styles.infoContainer} key={foodId}>
      <View style={styles.quantityWrapper}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View>
        <OrderStatus disabled={true} iconName={icons[status]} color={colors.primary} size={30}/>
      </View>
    </View>
);


const styles = StyleSheet.create({
  info: {
    paddingTop: 0,
    margin: 10,
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 0.3,
    borderColor: '#cccccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c0e11',
    textAlign: 'left'
  },
  quantityWrapper: {
    borderWidth: 2,
    padding: 10
  },
  quantity: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primary,
  }
});
