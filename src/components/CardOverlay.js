import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";



export default ({source, onPress, children = () => null}) => (
  <TouchableOpacity onPress={onPress}>
    <ImageBackground source={source} style={styles.image}>
      <View style={styles.wrapper}/>
      {children()}
    </ImageBackground>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  image: {
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 5,
    height: 300,
    justifyContent: 'center',
    padding: 10,
    margin: 10
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
    opacity: 0.3
  }
});
