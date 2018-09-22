import React from 'react'
import {RkButton} from 'react-native-ui-kitten';
import {Image,Text,StyleSheet} from 'react-native'

import { fonts, colors } from '../theme'

export default ({ onPress, imagePath }) => (
  <RkButton style={styles.plus} onPress={onPress}>
    <Image style={styles.icon} source={imagePath}/>
  </RkButton>
)

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: '#fff'
  },
  plus: {
    margin: 0,
    marginBottom: 5,
    margin: 10,
    borderRadius: 60,
    color: '#fff',
    backgroundColor: colors.primary,
    height: '90%',
    width: '15%'
  },
});
