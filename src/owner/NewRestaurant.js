import React from 'react';
import Form from '../components/Form';
import gql from 'graphql-tag';
import {Text, ScrollView, TouchableOpacity, Alert, View} from 'react-native';
import uuidv4 from 'uuid/v4';

import {colors} from '../theme';
import {CREATE_RESTAURANTE} from '../graphql/owner/';
import { connect } from 'redux-zero/react';
import actions from '../store/actions';

const mapToPros = ({user}) => ({user});
export default connect(mapToPros, actions)(({navigation: {getParam, goBack}, user}) => {
  const {ownerId} = user;
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
});
