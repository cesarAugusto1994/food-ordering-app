import React from 'react';
import CreateFood from '../components/CreateOrEditFood';
import gql from 'graphql-tag';
import {Text, ScrollView, TouchableOpacity, Alert, View} from 'react-native';
import uuidv4 from 'uuid/v4';
import FlashMessage from 'react-native-flash-message';

import {colors} from '../theme';
import {CREATE_FOOD} from '../graphql/owner/';
import { connect } from 'redux-zero/react';
import actions from '../store/actions';

const mapToPros = ({user, restaurantId}) => ({user, restaurantId});
export default connect(mapToPros, actions)(({navigation: {getParam, goBack}, user, restaurantId}) => {
  const {ownerId} = user;
  const foodId = uuidv4();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <CreateFood
          restaurantId={restaurantId}
          foodId={foodId}
          mutation={CREATE_FOOD}
          mutationName='createFood'
          goBack={goBack}
          text="Adicionar"
        />
        <FlashMessage position='top'/>
      </ScrollView>
    </View>
  )
});
