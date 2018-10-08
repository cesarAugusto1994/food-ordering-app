import React from 'react';
import EditRestaurant from '../components/CreateAndEditRestaurant';
import {Text, ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import gql from 'graphql-tag';
import {colors} from '../theme';
import FlashMessage from 'react-native-flash-message';


import CardOverlay from '../components/CardOverlay';
import TouchableLabel from '../components/TouchableLabel';
import {EDIT_RESTAURANTE} from '../graphql/owner/';


export default ({navigation: {getParam, goBack, navigate}, image}) => {
  const value = getParam('value');
  const restaurantId = getParam('restaurantId');
  const ownerId = getParam('ownerId');
  return (
    <View style={styles.container}>
        <ScrollView>
          <EditRestaurant
            edit={true}
            restaurantId={restaurantId}
            ownerId={ownerId}
            value={value}
            mutation={EDIT_RESTAURANTE}
            mutationName='updateRestaurant'
            goBack={goBack}
            text="Guardar"
            formStyle={styles.formStyle}
            containerStyle={styles.containerStyle}
            children={(onDelete) => (
              <View style={styles.wrapper}>
                <TouchableLabel
                  text='Ver refeiçoes'
                  onPress={() => navigate('MyFoods', {restaurantId})}
                  style={styles.text}
                />
                <TouchableLabel
                  text='Apagar Restaurante'
                  onPress={onDelete}
                  style={styles.text}
                />
              </View>
            )}
          />
        </ScrollView>
        <FlashMessage position='top'/>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    fontSize: 20,
    color: colors.primary
  },
  formStyle: {
    marginTop: 0
  },
  containerStyle: {
    marginTop: 0
  }
});
