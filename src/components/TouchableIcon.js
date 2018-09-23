import React from 'react'
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ({ onPress, iconName, size = 20, color = "#fff" }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name={iconName} size={size} color={color} />
  </TouchableOpacity>
);

// "chevron-left"
