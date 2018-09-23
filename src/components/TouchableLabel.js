import React from 'react'
import {TouchableOpacity, Text} from 'react-native';

export default ({onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>Ver refeições</Text>
    </TouchableOpacity>
  )
};
