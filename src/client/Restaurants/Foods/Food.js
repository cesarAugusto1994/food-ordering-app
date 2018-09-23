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


import BackButton from '../../../components/TouchableIcon';
import Header from '../../../components/HeaderWithChildren';
import Card from '../../../components/Card';

import { connect } from 'redux-zero/react';
import actions from '../../../store/actions';

import { colors, fonts } from '../../../theme'
import { getFoods } from '../../../graphql/client/foods'

export default connect(mapToProps, actions)(({navigation: {getParam, navigate, goBack}}) => {
    const restaurantId = getParam('restaurantId');
    return (
      <Query query={getFoods} variables={{restaurantId}}>
        {({loading, err, data}) => {
        return (
          <View style={styles.container}>
            <Header
              color={colors.primary}
              leftComponent={
                <BackButton onPress={() => goBack()} iconName="chevron-left" />
              }
              centerComponent={{ text: 'Refeições Disponiveis', style: { color: '#fff' } }}
            />
            <ScrollView>
              {
                data.getRestaurantFoods ?
                data.getRestaurantFoods.map(
                  ({name, description, price, image, foodId}) => (
                    <Card
                      description={description}
                      key={foodId}
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
