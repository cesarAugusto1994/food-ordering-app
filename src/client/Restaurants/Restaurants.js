/* eslint-disable no-use-before-define */
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Query } from 'react-apollo';

import CardRestaurant from '../../components/CardOverlay';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

// import { colors, fonts } from '../../theme';
import { getRestaurants } from '../../graphql/client';

export default ({ navigation }) => (
  <Query query={getRestaurants} fetchPolicy="cache-and-network">
    {({ loading, err, data }) => {
      if (loading) return <Spinner text="Carregando os restaurantes ..." />;
      if (err)
        return (
          <Error
            emoji="😰"
            text="Sentimos muito, ocorreu-se algum error enquanto carregavamos a lista de restaurantes. Feche e volte a abrir a aplicaçao!"
          />
        );
      if (data && data.restaurants.length === 0)
        return (
          <Error
            text="Oops! Não pudemos satisfazer a sua pesquisa"
            textStyle={{
              fontSize: 18,
            }}
          />
        );
      return (
        <React.Fragment>
          <FlatList
            style={styles.container}
            data={data && data.restaurants}
            // eslint-disable-next-line no-unused-vars
            keyExtractor={(item, index) => item.restaurantId}
            renderItem={({ item: { name, image, waitTime, restaurantId, phoneNumber } }) => (
              <CardRestaurant
                onPress={() =>
                  navigation.navigate('Foods', {
                    restaurantId,
                    phoneNumber,
                  })
                }
                key={restaurantId}
                contentPosition="center"
                source={{
                  uri: image,
                }}
                overlayAlpha={0.3}
                rounded={5}
              >
                {() => (
                  <React.Fragment key={restaurantId}>
                    <Text style={styles.text}> {name.toUpperCase()} </Text>
                    <View style={styles.waitTime}>
                      <Text style={styles.text2}>
                        Tempo de espera: {waitTime}
                        min
                      </Text>
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

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#f7fbff',
  },
  waitTime: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: '110%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
