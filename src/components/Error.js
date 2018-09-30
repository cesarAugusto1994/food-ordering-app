import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

export default ({
  containerStyle,
  textStyle,
  text,
  emoji,
  emojiStyle
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.emoji, emojiStyle]}>{emoji}</Text>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60
  },
  text: {
    color: '#000'
  }
});
