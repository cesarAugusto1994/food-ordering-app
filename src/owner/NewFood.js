/* eslint-disable react/require-default-props */
import React from 'react';
import gql from 'graphql-tag';
import PropType from 'prop-types';
import { ScrollView, View } from 'react-native';
import uuid from 'short-uuid';
import FlashMessage from 'react-native-flash-message';

import { withApollo } from 'react-apollo';
import { CREATE_FOOD } from '../graphql/owner';
import CreateFood from '../components/CreateOrEditFood';

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

const NewFood = ({ navigation: { goBack }, client }) => {
  const {
    user: { id: ownerId },
    restaurantId: { id: restaurantId },
  } = client.readQuery({ query });
  const foodId = uuid();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <CreateFood
          restaurantId={restaurantId}
          foodId={foodId}
          ownerId={ownerId}
          mutation={CREATE_FOOD}
          mutationName="createFood"
          goBack={goBack}
          text="Adicionar"
        />
        <FlashMessage position="top" />
      </ScrollView>
    </View>
  );
};

NewFood.propTypes = {
  navigation: PropType.shape({
    goBack: PropType.func,
  }),
  client: PropType.shape({
    readQuery: PropType.func,
  }),
};

export default withApollo(NewFood);
