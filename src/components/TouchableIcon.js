import React from 'react'
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ({ onPress, iconName, size = 20, color = "#fff", style = null, disabled = false}) => (
  <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
    <Icon name={iconName} size={size} color={color} />
  </TouchableOpacity>
);
