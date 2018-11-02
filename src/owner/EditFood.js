import React from 'react';
import EditFood from '../components/CreateOrEditFood';
import gql from 'graphql-tag';
import {Text, ScrollView, TouchableOpacity, Alert, View} from 'react-native';
import uuidv4 from 'uuid/v4';
import FlashMessage from 'react-native-flash-message';

import {colors} from '../theme';
import {EDIT_FOOD} from '../graphql/owner/';
import { connect } from 'redux-zero/react';
import actions from '../store/actions';

const mapToPros = ({user, restaurantId}) => ({user, restaurantId});
export default connect(mapToPros, actions)(({navigation: {getParam, goBack}, user, restaurantId}) => {
  const foodId = getParam('foodId');
  const name = getParam('name');
  const description = getParam('description');
  const image = getParam('image');
  const price = getParam('price');
  const {ownerId} = user;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <EditFood
          restaurantId={restaurantId}
          foodId={foodId}
          ownerId={ownerId}
          mutation={EDIT_FOOD}
          mutationName='updateFood'
          edit={true}
          goBack={goBack}
          value={{description, name, image, price}}
          text="Guardar"
        />
        <FlashMessage position='top'/>
      </ScrollView>
    </View>
  )
});
