/* eslint-disable react/require-default-props */
import React from 'react';
import gql from 'graphql-tag';
import PropType from 'prop-types';
import { ScrollView, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import { withApollo } from 'react-apollo';
import { EDIT_FOOD } from '../graphql/owner';
import Edit from '../components/CreateOrEditFood';

const query = gql`
  {
    user @client {
      id
    }
    restaurantId @client {
      id
    }
  }
`;

const EditFood = ({ navigation: { getParam, goBack }, client }) => {
  const {
    user: { id: ownerId },
    restaurantId: { id: restaurantId },
  } = client.readQuery({ query });
  const foodId = getParam('foodId');
  const name = getParam('name');
  const description = getParam('description');
  const image = getParam('image');
  const price = getParam('price');
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <Edit
          restaurantId={restaurantId}
          foodId={foodId}
          ownerId={ownerId}
          mutation={EDIT_FOOD}
          mutationName="updateFood"
          edit
          goBack={goBack}
          value={{ description, name, image, price }}
          text="Guardar"
        />
        <FlashMessage position="top" />
      </ScrollView>
    </View>
  );
};

EditFood.propTypes = {
  navigation: PropType.shape({
    getParam: PropType.func,
    goBack: PropType.func,
  }),
  client: PropType.shape({
    readQuery: PropType.func,
  }),
};

export default withApollo(EditFood);
