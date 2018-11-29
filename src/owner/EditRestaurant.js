/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import PropType from 'prop-types';
import FlashMessage from 'react-native-flash-message';
import { colors } from '../theme';

import TouchableLabel from '../components/TouchableLabel';
import { EDIT_RESTAURANTE } from '../graphql/owner';
import Edit from '../components/CreateAndEditRestaurant';

const EditRestaurant = ({ navigation: { getParam, goBack, navigate } }) => {
  const value = getParam('value');
  const restaurantId = getParam('restaurantId');
  const ownerId = getParam('ownerId');
  const phoneNumber = getParam('phoneNumber');
  return (
    <View style={styles.container}>
      <ScrollView>
        <Edit
          edit
          restaurantId={restaurantId}
          ownerId={ownerId}
          phoneNumber={phoneNumber}
          value={value}
          mutation={EDIT_RESTAURANTE}
          mutationName="updateRestaurant"
          goBack={goBack}
          text="Guardar"
          formStyle={styles.formStyle}
          containerStyle={styles.containerStyle}
        >
          {onDelete => (
            <View style={styles.wrapper}>
              <TouchableLabel
                text="Ver refeiçoes"
                onPress={() => navigate('MyFoods', { restaurantId })}
                style={[styles.text, { color: colors.green }]}
              />
              <TouchableLabel
                text="Apagar Restaurante"
                onPress={onDelete}
                style={[styles.text, { color: colors.red }]}
              />
            </View>
          )}
        </Edit>
      </ScrollView>
      <FlashMessage position="top" />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    // marginTop: 10
  },
  text: {
    fontSize: 20,
    color: colors.primary,
  },
  formStyle: {
    marginTop: 0,
  },
  containerStyle: {
    marginTop: 0,
  },
});

EditRestaurant.propTypes = {
  navigation: PropType.shape({
    getParam: PropType.func,
    goBack: PropType.func,
    navigate: PropType.func,
  }),
};

export default EditRestaurant;
