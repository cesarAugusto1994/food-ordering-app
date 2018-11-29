/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import PropType from 'prop-types';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import ImageOverlay from '../components/CardOverlay';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import { myRestaurants } from '../graphql/owner';

const query = gql`
  {
    user @client {
      id
    }
  }
`;

const Restaurants = ({ navigation: { navigate }, client }) => {
  const {
    user: { id: ownerId },
  } = client.readQuery({ query });
  return (
    <Query query={myRestaurants} variables={{ ownerId }} fetchPolicy="cache-and-network">
      {({ loading, err, data }) => {
        if (loading) return <Spinner text="Carregando os seus restaurantes ..." />;
        if (err)
          return (
            <Error
              emoji="😰"
              text="Sentimos muito, ocorreu-se algum error enquanto carregavamos a lista de seus restaurantes. Feche e volte a abrir a aplicaçao!"
            />
          );
        return (
          <View style={styles.container}>
            <FlatList
              data={data && data.restaurants}
              // eslint-disable-next-line no-unused-vars
              keyExtractor={(item, index) => item.restaurantId}
              renderItem={({
                item: {
                  name,
                  description,
                  image,
                  waitTime,
                  speciality,
                  location,
                  restaurantId,
                  phoneNumber,
                  scheduleStart,
                  scheduleEnd,
                  isWeekendOpen,
                },
              }) => (
                <ImageOverlay
                  key={restaurantId}
                  index={restaurantId}
                  source={{ uri: image }}
                  onPress={() =>
                    navigate('EditRestaurant', {
                      restaurantId,
                      ownerId,
                      value: {
                        name,
                        description,
                        location,
                        waitTime,
                        speciality,
                        phoneNumber,
                        image,
                        scheduleStart,
                        scheduleEnd,
                        isWeekendOpen,
                      },
                    })
                  }
                  contentPosition="center"
                  overlayAlpha={0.3}
                  rounded={5}
                >
                  {() => <Text style={styles.text}>{name.toUpperCase()}</Text>}
                </ImageOverlay>
              )}
            />
          </View>
        );
      }}
    </Query>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

Restaurants.propTypes = {
  navigation: PropType.shape({
    navigate: PropType.func,
  }),
  client: PropType.shape({
    readQuery: PropType.func,
  }),
};

export default withApollo(Restaurants);
