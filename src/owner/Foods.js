import React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Query, graphql } from "react-apollo";
import gql from 'graphql-tag';

import Card from '../components/OwnerFoodList';
import Spinner from '../components/Spinner';
import TouchableIcon from '../components/TouchableIcon';
import Error from '../components/Error';

import { connect } from 'redux-zero/react';
import {showMessage} from 'react-native-flash-message';
import actions from '../store/actions';

import { colors, fonts } from '../theme';
import { getRestaurantsFoods, DELETE_FOOD } from '../graphql/owner';

class Foods extends React.Component {
  componentDidMount() {
    this.props.setTempRestaurantId(this.props.navigation.getParam('restaurantId'));
  }
  deleteFood = (client, foodId, restaurantId) => {
    client.mutate({mutation: DELETE_FOOD, variables: {foodId, restaurantId}})
    .then(({data}) => {
      client.resetStore();
      return showMessage({type: 'success', message: 'Apagado com sucesso'})
    })
    .catch(err => console.log({errrrrrd: err}) || showMessage({
      type: 'danger',
      message: 'Houve um erro ao tentar apagar este prato',
      backgroundColor: 'red'
    }))
  }
  render() {
    const {getParam, goBack} = this.props.navigation
    const restaurantId = getParam('restaurantId');
    return (
      <Query query={getRestaurantsFoods} variables={{restaurantId}}>
        {({loading, err, data, client}) => {
          if(loading) return <Spinner text="Carregando as suas refeiçoes ..."/>
          if(err) return (
            <Error
              emoji='😰'
              text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos os seus dados. Feche e volte a abrir a aplicaçao!`}
            />
          )
          if(data.listFoods.items.length === 0 ) return (
            <Error
              text='Oops! Não pudemos satisfazer a sua pesquisa'
              textStyle={{fontSize: 18}}/>
          )
          return (
            <View style={styles.container}>
              <ScrollView>
                {
                  data.listFoods.items.map(
                    ({name, description, price, image, foodId, restaurantId}) => (
                      <Card
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
                    )
                  )
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
  user,
  card,
  setTempRestaurantId,
  restaurantId
}) => ({
  user,
  card,
  setTempRestaurantId,
  restaurantId
});

export default connect(mapToProps, actions)(Foods);
