import React from 'react';
import CreateRestaurant from '../components/CreateAndEditRestaurant';
import CardOverlay from '../components/CardOverlay';
import gql from 'graphql-tag';
import {Text, ScrollView, TouchableOpacity, Alert, View} from 'react-native';
import short from 'short-uuid';
import FlashMessage from 'react-native-flash-message';

import {colors} from '../theme';
import {CREATE_RESTAURANTE} from '../graphql/owner/';
import { connect } from 'redux-zero/react';
import actions from '../store/actions';
import {styles} from './EditRestaurant';

const mapToPros = ({user}) => ({user});
export default connect(mapToPros, actions)(({navigation: {getParam, goBack}, user}) => {
  const {ownerId} = user;
  const restaurantId = short.uuid();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <CreateRestaurant
          ownerId={ownerId}
          restaurantId={restaurantId}
          mutation={CREATE_RESTAURANTE}
          mutationName='createrestaurant'
          formStyle={styles.formStyle}
          containerStyle={styles.containerStyle}
          goBack={goBack}
          text="Adicionar"
        />
        <FlashMessage position='top'/>
      </ScrollView>
    </View>
  )
});
