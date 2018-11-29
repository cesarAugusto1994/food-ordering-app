import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Query } from 'react-apollo';

import CardRestaurant from '../../components/CardOverlay';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

import { styles } from '../Restaurants/Restaurants';
import { filterRestaurants } from '../../graphql/client';

const RestaurantList = ({ navigation: { navigate, state } }) => (
  <Query
    query={filterRestaurants}
    fetchPolicy="cache-and-network"
    variables={{ speciality: state.params.name }}
  >
    {({ loading, err, data }) => {
      if (loading) return <Spinner text="Carregando os restaurantes ..." />;
      if (err)
        return (
          <Error
            emoji="😰"
            text="Sentimos muito, ocorreu-se algum error enquanto carregavamos a list de restaurantes. Feche e volte a abrir a aplicaçao!"
          />
        );
      if (data.restaurants.length === 0)
        return (
          <Error text="Oops! Não pudemos satisfazer a sua pesquisa" textStyle={{ fontSize: 18 }} />
        );
      return (
        <React.Fragment>
          <FlatList
            style={styles.container}
            data={data && data.restaurants}
            // eslint-disable-next-line no-unused-vars
            keyExtractor={(item, index) => item.restaurantId}
            renderItem={({ item: { name, image, waitTime, restaurantId } }) => (
              <CardRestaurant
                onPress={() => navigate('Foods', { restaurantId })}
                index={restaurantId}
                key={restaurantId}
                contentPosition="center"
                source={{ uri: image }}
                overlayAlpha={0.3}
                rounded={5}
              >
                {() => (
                  <React.Fragment key={restaurantId}>
                    <Text style={styles.text}>{name.toUpperCase()}</Text>
                    <View style={styles.waitTime}>
                      <Text style={styles.text2}>Tempo de espera: {waitTime}min</Text>
                    </View>
                  </React.Fragment>
                )}
              </CardRestaurant>
            )}
          />
        </React.Fragment>
      );
    }}
  </Query>
);

export default RestaurantList;
