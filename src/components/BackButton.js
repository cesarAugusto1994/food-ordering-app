import React from 'react'
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import { colors } from '../theme';

export default ({ onPress, imagePath, addStyle }) => (
  <TouchableOpacity onPress={onPress} style={addStyle}>
    <Image style={[styles.icon]} source={imagePath}/>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: '#fff'
  }
});
