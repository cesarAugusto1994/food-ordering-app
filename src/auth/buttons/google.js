import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import styles from '../styles';

const GoogleAuthButton = ({loginWithGoogle}) => (
  <TouchableOpacity onPress={loginWithGoogle} style={[styles.user.social, {backgroundColor: '#dd4b39'}]}>
    <Image
      style={styles.user.button}
      source={require('../../assets/google-plus.png')}
    />
    <Text style={styles.user.socialText}>Conectar-se com Google</Text>
  </TouchableOpacity>
)

export default GoogleAuthButton;
