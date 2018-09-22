import React from 'react'
import {RkButton} from 'react-native-ui-kitten';
import {Image,Text,StyleSheet} from 'react-native'

import { fonts, colors } from '../theme'

export default ({ onPress, imagePath, text }) => (
  <RkButton style={styles.button} onPress={onPress}>
    <Image style={styles.icon} source={imagePath}/>
    <Text style={styles.text}>{text}</Text>
</RkButton>
)

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: '#fff'
  },
  text: {
    color: 'white'
  },
  button: {
    margin: 0,
    marginLeft: 40,
    marginBottom: 5,
    color: '#fff',
    backgroundColor: colors.primary,
    width: '80%'
  },
});
