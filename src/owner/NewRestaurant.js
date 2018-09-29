import React from 'react';
import Form from '../components/Form';
import gql from 'graphql-tag';
import {Text, ScrollView, TouchableOpacity, Alert, View} from 'react-native';
import uuidv4 from 'uuid/v4';

import {colors} from '../theme';
import {CREATE_RESTAURANTE} from '../graphql/owner/';

export default ({navigation: {getParam, goBack}}) => {
  const {ownerId} = getParam('value');
  const restaurantId = uuidv4();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <Form
          color={colors.primary}
          ownerId={ownerId}
          restaurantId={restaurantId}
          mutation={CREATE_RESTAURANTE}
          mutationName='createrestaurant'
          alert={() => {}}
          text="Adicionar"
        />
      </ScrollView>
    </View>
  )
};
