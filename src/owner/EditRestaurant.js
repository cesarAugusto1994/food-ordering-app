import React from 'react';
import Form from '../components/Form';
import {Text, ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import gql from 'graphql-tag';
import {colors} from '../theme';


import CardOverlay from '../components/CardOverlay';
import TouchableLabel from '../components/TouchableLabel';
import BackButton from '../components/TouchableIcon';
import Header from '../components/HeaderWithChildren';


export default ({navigation: {getParam, goBack, navigate}, image}) => {
  const value = getParam('value');
  const restaurantId = getParam('restaurantId');
  const ownerId = getParam('ownerId');
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header color={colors.primary}>
        {() => (
          <React.Fragment>
            <BackButton onPress={() => goBack()} iconName="chevron-left"/>
            <Text style={{color: '#fff'}}>Editar restaurante</Text>
          </React.Fragment>
        )}
      </Header>
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
            alert={() => {}}
            text="Guardar"
          />
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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


const EDIT_RESTAURANTE = gql`
mutation editRestaurante(
  $name: String,
  $image: String,
  $description: String,
  $restaurantId: String!,
  $waitTime: Int,
  $speciality: String!,
  $location: String) {
    editRestaurant(
      name: $name,
      description: $description,
      restaurantId: $restaurantId,
      image: $image,
      waitTime: $waitTime,
      speciality: $speciality,
      location: $location
      )  {
      ownerId
    }
}`;
