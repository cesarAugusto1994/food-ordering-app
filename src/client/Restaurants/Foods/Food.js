import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Query, graphql } from "react-apollo";
import gql from 'graphql-tag';


import Card from '../../../components/Card';

import { connect } from 'redux-zero/react';
import actions from '../../../store/actions';

import { colors, fonts } from '../../../theme';
import { getRestaurantsFoods } from '../../../graphql/owner';

export default connect(mapToProps, actions)(({navigation: {getParam, navigate, goBack}}) => {
    const restaurantId = getParam('restaurantId');
    return (
      <Query query={getRestaurantsFoods} variables={{restaurantId}}>
        {({loading, err, data}) => {
        return (
          <View style={styles.container}>
            <ScrollView>
              {
                data.listFoods ?
                data.listFoods.items.map(
                  ({name, description, price, image, foodId}) => (
                    <Card
                      description={description}
                      index={foodId}
                      name={name}
                      price={price}
                      image={image}
                      foodId={foodId}
                      onPress={
                        () => navigate({routeName: 'FoodItem', params: {foodId, name}})
                      }
                    />
                  ))
                : <Text>Este restaurante ainda não tem refeições disponiveis</Text>
              }
            </ScrollView>
          </View>
        )}}
      </Query>
    )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

const mapToProps = ({
  isAuthed,
  user,
  addToCard,
  card,
  currentUser
}) => ({
  isAuthed,
  user,
  addToCard,
  card,
  currentUser
});
