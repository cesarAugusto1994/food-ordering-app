import React from 'react'
import {Image,Text,StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts, colors } from '../theme'

export default ({ onPress, iconName, color = '#fff', size = 30 }) => (
  <TouchableOpacity style={styles.plus} onPress={onPress}>
    <Icon name={iconName} color={color} size={30}/>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: '#fff'
  },
  plus: {
    margin: 0,
    marginBottom: 5,
    margin: 10,
    borderRadius: 60,
    color: '#fff',
    backgroundColor: colors.primary,
    height: 50,
    width: '15%',
    alignItems:'center',
    justifyContent: 'center'
  },
});
