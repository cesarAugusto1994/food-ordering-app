import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import { colors } from '../theme';

export default ({ onPress, key, description, name, image, price, foodId }) => (
  <TouchableOpacity onPress={onPress} key={foodId}>
    <View style={styles.infoContainer}>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.info}>
        <Text style={styles.nameText}>{name}</Text>
        <Text>{description}</Text>
        <Text>Preço: <Text style={styles.priceText}>{price}00</Text> Kzs</Text>
      </View>
    </View>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  info: {
    paddingTop: 0,
    marginLeft: 10,
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
    alignItems: 'center'
  },
  image: {
    padding: 5,
    paddingLeft: 3,
    height: 70,
    width: 80
  },
  nameText: {
    fontSize: 16,
    color: '#0c0e11',
    textAlign: 'left'
  },
  priceText: {
      color: colors.primary,
  }
});
