import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import styles from '../styles';

const FacebookAuthButton = ({loginWithFacebook}) => (
  <TouchableOpacity onPress={loginWithFacebook} style={[styles.user.social, {backgroundColor: '#3b5998'}]}>
    <Image
      style={styles.user.button}
      source={require('../../assets/facebook.png')}
    />
    <Text style={styles.user.socialText}>Conectar-se com Facebook</Text>
  </TouchableOpacity>
)

export default FacebookAuthButton;
