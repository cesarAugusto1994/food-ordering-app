import React from 'react';
import Form from '../components/Form';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {Header} from 'react-native-elements';
import {Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {colors} from '../theme'

const showAlert = (nav) => () => Alert.alert(
    'Adicionado',
    'O restaurante foi adicionado com sucesso!',
    [
      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
);

export default ({navigation: {getParam, goBack}}) => {
  const value = getParam('value');
  return (
    <React.Fragment>
      <Header backgroundColor={colors.primary}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon
            name="chevron-left"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={{color: '#fff'}}>Adicionar novo restaurante</Text>
      </Header>
      <ScrollView>
        <Form
          color={colors.primary}
          ownerId={value.ownerId}
          mutation={CREATE_RESTAURANTE}
          alert={showAlert(goBack)}
          text="Adicionar"
        />
      </ScrollView>
    </React.Fragment>
  )
}

const CREATE_RESTAURANTE = gql`
mutation createRestaurante(
  $ownerId: String!,
  $name: String!,
  $image: String!,
  $description: String!,
  $waitTime: Int!,
  $speciality: String!,
  $location: String!
  ) {
    createRestaurant(
      ownerId: $ownerId,
      name: $name,
      image: $image,
      description: $description,
      waitTime: $waitTime,
      speciality: $speciality,
      location: $location
      )  {
      ownerId
    }
}`;
