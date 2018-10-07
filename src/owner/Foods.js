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

import Card from '../components/Card';
import Spinner from '../components/Spinner';
import TouchableIcon from '../components/TouchableIcon';
import Error from '../components/Error';

import { connect } from 'redux-zero/react';
import actions from '../store/actions';

import { colors, fonts } from '../theme';
import { getRestaurantsFoods } from '../graphql/owner';

class Foods extends React.Component {
  componentDidMount() {
    this.props.setTempRestaurantId(this.props.navigation.getParam('restaurantId'));
  }
  render() {
    const {getParam, goBack} = this.props.navigation
    const restaurantId = getParam('restaurantId');
    console.log('----->', this.props)
    return (
      <Query query={getRestaurantsFoods} variables={{restaurantId}}>
        {({loading, err, data}) => {
          if(loading) return <Spinner text="Carregando as suas refeiçoes ..."/>
          if(err) return (
            <Error
              emoji='😰'
              text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos os seus dados. Feche e volte a abrir a aplicaçao!`}
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
                        name={name}
                        price={price}
                        image={image}
                        foodId={foodId}
                        onPress={
                          () => this.props.navigation.navigate({routeName: 'FoodItem', params: {foodId, name}})
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
