/* eslint-disable no-use-before-define */
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Query } from 'react-apollo';
// import gql from 'graphql-tag';

import Card from '../../../components/Card';
import Spinner from '../../../components/Spinner';
import Error from '../../../components/Error';

// import { colors, fonts } from '../../../theme';
import { getRestaurantsFoods } from '../../../graphql/owner';

export default ({ navigation: { getParam, navigate } }) => {
  const restaurantId = getParam('restaurantId');
  const restaurantPhoneNumber = getParam('phoneNumber');
  return (
    <Query query={getRestaurantsFoods} variables={{ restaurantId }}>
      {({ loading, err, data }) => {
        if (loading) return <Spinner text="Carregando as refeiçoes ..." />;
        if (err)
          return (
            <Error
              emoji="😰"
              text="Sentimos muito, ocorreu-se algum error enquanto carregavamos a lista de refeiçoes. Feche e volte a abrir a aplicaçao!"
            />
          );
        if (data.foods.length === 0)
          return (
            <Error
              text="Oops! Não pudemos satisfazer a sua pesquisa"
              textStyle={{ fontSize: 18 }}
            />
          );
        return (
          <View style={styles.container}>
            <FlatList
              data={data && data.foods}
              // eslint-disable-next-line no-unused-vars
              keyExtractor={(item, index) => item.foodId}
              renderItem={({ item: { name, description, price, image, foodId, ownerId } }) => (
                <Card
                  description={description}
                  key={foodId}
                  name={name}
                  price={price}
                  image={image}
                  foodId={foodId}
                  onPress={() =>
                    navigate({
                      routeName: 'FoodItem',
                      params: {
                        foodId,
                        restaurantId,
                        ownerId,
                        name,
                        price,
                        image,
                        description,
                        restaurantPhoneNumber,
                      },
                    })
                  }
                />
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
});
