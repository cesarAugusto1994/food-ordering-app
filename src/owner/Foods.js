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


import { Header } from 'react-native-elements';
import BackButton from '../components/BackButton';
import Card from '../components/Card';

import { connect } from 'redux-zero/react';
import actions from '../store/actions';

import { colors, fonts } from '../theme'
import { getFoods } from '../graphql/client/foods'

class Foods extends React.Component {
  render() {
    const {getParam, goBack} = this.props.navigation
    const restaurantId = getParam('restaurantId');
    return (
      <Query query={getFoods} variables={{restaurantId}}>
        {({loading, err, data}) => {
        return (
          <View style={styles.container}>
            <Header
              backgroundColor={colors.primary}
              leftComponent={
                <BackButton
                  onPress={() => goBack()}
                  imagePath={require('../assets/back.png')}
                />
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
                      name={name}
                      price={price}
                      image={image}
                      foodId={foodId}
                      onPress={
                        () => this.props.navigation.navigate({routeName: 'FoodItem', params: {foodId, name}})
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
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

export default connect(mapToProps, actions)(Foods)
