import React from 'react';
import { View, StyleSheet, FlatList, Alert} from 'react-native';
import { Query, graphql, withApollo } from "react-apollo";
import gql from 'graphql-tag';

import Card from '../components/OwnerFoodList';
import Spinner from '../components/Spinner';
import TouchableIcon from '../components/TouchableIcon';
import Error from '../components/Error';

import {showMessage} from 'react-native-flash-message';

import { colors, fonts } from '../theme';
import { getRestaurantsFoods, DELETE_FOOD } from '../graphql/owner';

class Foods extends React.Component {
  componentDidMount() {
    this.props.client.writeData({
      data: {
        restaurantId: {
          id: this.props.navigation.getParam('restaurantId'),
          __typename: 'RestaurantID'
        }
      }
    });
  }
  deleteFood = (client, foodId, restaurantId) => {
    const message = 'Tem a certeza que pretende apagar este prato?';
    Alert.alert(
      'Apagar prato',
      message,
      [
        {text: 'Nao', onPress: () => {}},
        {text: 'Sim', onPress: () => this.foodDeletion(client, foodId, restaurantId)},
      ],
      { cancelable: false }
    )
  }

  foodDeletion = (client, foodId, restaurantId) => {
    client.mutate({mutation: DELETE_FOOD, variables: {foodId, restaurantId}})
    .then(({data}) => {
      client.resetStore();
      return showMessage({type: 'success', message: 'Apagado com sucesso'})
    })
    .catch(err => showMessage({
      type: 'danger',
      message: 'Houve um erro ao tentar apagar este prato',
      backgroundColor: 'red'
    }))
  }
  render() {
    const {getParam, goBack} = this.props.navigation;
    const restaurantId = getParam('restaurantId');
    return (
      <Query query={getRestaurantsFoods} variables={{restaurantId}} fetchPolicy='cache-and-network'>
        {({loading, err, data, client}) => {
          console.log({data})
          if(loading) return <Spinner text="Carregando as suas refeiçoes ..."/>
          if(err) return (
            <Error
              emoji='😰'
              text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos os seus dados. Feche e volte a abrir a aplicaçao!`}
            />
          )
          if(data.foods.length === 0 ) return (
            <Error
              text='Oops! Não pudemos satisfazer a sua pesquisa'
              textStyle={{fontSize: 18}}
            />
          )
          return (
            <View style={styles.container}>
              <FlatList
                data={data.foods}
                keyExtractor={(item, index) => item.foodId}
                renderItem={({item: {name, description, price, image, foodId, restaurantId}}) => (
                  <Card
                    key={foodId}
                    { ...{
                      description,
                      name,
                      price,
                      image,
                      foodId
                      }}
                    onDelete={this.deleteFood.bind(this, client, foodId, restaurantId)}
                    onPress={
                      () => this.props.navigation.navigate({routeName: 'EditFood', params: {
                        foodId,
                        description,
                        name,
                        price,
                        image
                        }})
                    }
                  />
                )}
              />
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
});

export default withApollo(Foods);
