import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../theme'


export default ({
  containerStyle,
  textStyle,
  text,
  size = 'large',
  color = '#fff'
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={size} color={color} />
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.primary
  }
});
