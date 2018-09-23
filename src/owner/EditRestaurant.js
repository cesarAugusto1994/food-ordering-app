import React from 'react';
import Form from '../components/Form';
import {Header} from 'react-native-elements';
import {Text, ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import gql from 'graphql-tag';
import {colors} from '../theme';
import CardOverlay from '../components/CardOverlay';

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

export default ({navigation: {getParam, goBack, navigate}, image}) => {
  const value = getParam('value');
  const restaurantId = getParam('restaurantId');
  const ownerId = getParam('ownerId');
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
        <Text style={{color: '#fff'}}>Editar restaurante</Text>
      </Header>
        <ScrollView>
          <CardOverlay source={{uri: value.image}} />
          <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => navigate('MyFoods', {restaurantId})}>
              <Text style={styles.text}>Ver refeições</Text>
            </TouchableOpacity>
          </View>
          <Form
            color={colors.primary}
            edit={true}
            restaurantId={restaurantId}
            ownerId={ownerId}
            value={value}
            mutation={EDIT_RESTAURANTE}
            alert={showAlert(goBack)}
            text="Guardar"
          />
        </ScrollView>
    </React.Fragment>
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
