import React from 'react'
import {TouchableOpacity, Text} from 'react-native';

export default ({onPress, style, text}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{text}</Text>
    </TouchableOpacity>
  )
};
