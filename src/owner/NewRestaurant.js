/* eslint-disable react/require-default-props */
import React from 'react';
import { ScrollView, View } from 'react-native';
import short from 'short-uuid';
import FlashMessage from 'react-native-flash-message';
import PropType from 'prop-types';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
import { CREATE_RESTAURANTE } from '../graphql/owner';
import CreateRestaurant from '../components/CreateAndEditRestaurant';
import { styles } from './EditRestaurant';

const query = gql`
  {
    user @client {
      id
    }
  }
`;

// eslint-disable-next-line react/prop-types
const NewRestaurant = ({ navigation: { goBack }, client }) => {
  const {
    user: { id: ownerId },
  } = client.readQuery({ query });
  const restaurantId = short.uuid();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <CreateRestaurant
          ownerId={ownerId}
          restaurantId={restaurantId}
          mutation={CREATE_RESTAURANTE}
          mutationName="createrestaurant"
          formStyle={styles.formStyle}
          containerStyle={styles.containerStyle}
          goBack={goBack}
          text="Adicionar"
        />
        <FlashMessage position="top" />
      </ScrollView>
    </View>
  );
};

NewRestaurant.propTypes = {
  navigation: PropType.shape({
    goBack: PropType.func,
  }),
  client: PropType.shape({
    readQuery: PropType.func,
  }),
};

export default withApollo(NewRestaurant);
