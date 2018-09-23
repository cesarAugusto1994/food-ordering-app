import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';

const FacebookAuthButton = ({loginWithFacebook}) => (
  <TouchableOpacity onPress={loginWithFacebook} style={[styles.user.social, {backgroundColor: '#3b5998'}]}>
    <Icon name='facebook-official' size={30} color='#fff'/>
    <Text style={styles.user.socialText}> Conectar-se com Facebook</Text>
  </TouchableOpacity>
)

export default FacebookAuthButton;
