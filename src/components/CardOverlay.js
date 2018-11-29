/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default ({
  source,
  onPress,
  children = () => null,
  imageStyle,
  wrapperStyle,
  disabled = false,
}) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <ImageBackground source={source} style={[styles.image, imageStyle]}>
      <View style={[styles.wrapper, wrapperStyle]} />
      {children()}
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 5,
    height: 300,
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    opacity: 0.3,
  },
});
