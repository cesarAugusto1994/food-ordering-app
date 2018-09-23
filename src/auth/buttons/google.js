import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import styles from '../styles';

const GoogleAuthButton = ({loginWithGoogle}) => (
  <TouchableOpacity onPress={loginWithGoogle} style={[styles.user.social, {backgroundColor: '#dd4b39'}]}>
    <Icon name='sc-google-plus' size={30} color='#fff'/>
    <Text style={styles.user.socialText}> Conectar-se com Google</Text>
  </TouchableOpacity>
)

export default GoogleAuthButton;
