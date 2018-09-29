import React from 'react';
import Form from '../components/Form';
import {Text, ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import gql from 'graphql-tag';
import {colors} from '../theme';


import CardOverlay from '../components/CardOverlay';
import TouchableLabel from '../components/TouchableLabel';
import {EDIT_RESTAURANTE} from '../graphql/owner/';


export default ({navigation: {getParam, goBack, navigate}, image}) => {
  const value = getParam('value');
  const restaurantId = getParam('restaurantId');
  const ownerId = getParam('ownerId');
  console.log('---->', {ownerId, restaurantId});
  return (
    <View style={styles.container}>
        <ScrollView>
          <CardOverlay source={{uri: value.image}} />
          <View style={styles.wrapper}>
            <TouchableLabel
              onPress={() => navigate('MyFoods', {restaurantId})}
              style={styles.text}
            />
          </View>
          <Form
            color={colors.primary}
            edit={true}
            restaurantId={restaurantId}
            ownerId={ownerId}
            value={value}
            mutation={EDIT_RESTAURANTE}
            mutationName='updateRestaurant'
            alert={() => {}}
            text="Guardar"
          />
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    fontSize: 20,
    color: colors.primary
  }
});
