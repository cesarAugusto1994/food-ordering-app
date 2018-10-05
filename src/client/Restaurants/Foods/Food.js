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
import Spinner from '../../../components/Spinner';
import Error from '../../../components/Error';

import { connect } from 'redux-zero/react';
import actions from '../../../store/actions';

import { colors, fonts } from '../../../theme';
import { getRestaurantsFoods } from '../../../graphql/owner';

export default connect(mapToProps, actions)(({navigation: {getParam, navigate, goBack}, ...props}) => {
    console.log('okokokok', {props})
    const restaurantId = getParam('restaurantId');
    return (
      <Query query={getRestaurantsFoods} variables={{restaurantId}}>
        {({loading, err, data}) => {
          if(loading) return <Spinner text="Carregando as refeiçoes ..."/>
          if(err) return (
            <Error
              emoji='😰'
              text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos a lista de refeiçoes. Feche e volte a abrir a aplicaçao!`}
            />
          )
          return (
            <View style={styles.container}>
              <ScrollView>
                {
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
                    )
                  )
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
