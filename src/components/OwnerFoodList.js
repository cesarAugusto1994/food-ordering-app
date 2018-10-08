import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import DeleteButton from './TouchableIcon';
import { colors } from '../theme';
import { styles } from './Card';

export default ({
  onPress,
  key,
  description,
  name,
  image,
  price,
  foodId,
  onDelete
}) => (
  <TouchableOpacity onPress={onPress} key={foodId}>
    <View style={styles.infoContainer}>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.info}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.priceText}>AOA {price}</Text>
      </View>
      <View>
        <DeleteButton onPress={onDelete} iconName='remove' color={colors.primary} size={30}/>
      </View>
    </View>
  </TouchableOpacity>
);
