import React from 'react';
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts, colors } from '../theme';

export default ({ onPress, iconName, text, color = '#fff', size = 30, buttonStyle }) => (
  <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
    <Icon name={iconName} size={size} color={color} />
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: '#fff',
  },
  text: {
    color: 'white',
  },
  button: {
    margin: 0,
    marginLeft: 40,
    marginBottom: 5,
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.primary,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
