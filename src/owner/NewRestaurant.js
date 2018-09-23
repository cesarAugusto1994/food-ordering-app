import React from 'react';
import Form from '../components/Form';
import gql from 'graphql-tag';
import {Text, ScrollView, TouchableOpacity, Alert, View} from 'react-native';

import {colors} from '../theme'

export default ({navigation: {getParam, goBack}}) => {
  const value = getParam('value');
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <Form
          color={colors.primary}
          ownerId={value.ownerId}
          mutation={CREATE_RESTAURANTE}
          alert={() => {}}
          text="Adicionar"
        />
      </ScrollView>
    </View>
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
