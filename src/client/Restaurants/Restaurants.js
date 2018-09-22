import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'
import { Query } from "react-apollo";
import { connect } from 'redux-zero/react'
import {RkCard, RkButton, rkCardImg, rkCardHeader, rkCardContent, rkCardFooter} from 'react-native-ui-kitten';
import { StackNavigator } from 'react-navigation';

import { Header } from 'react-native-elements';

import CardRestaurant from '../../components/CardRestaurant';

import Food from './Foods/Food'
import FoodItem from './Foods/FoodItem'
import { colors, fonts } from '../../theme'
const { width, height } = Dimensions.get('window')

import {getRestaurants} from '../../graphql'
class Restaurants extends React.Component {
  render() {
    return (
      <Query query={getRestaurants}>
        {({loading, err, data}) => {
          console.log(data)
          return (
            <React.Fragment>
              <Header
                backgroundColor={colors.primary}
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Restaurantes', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                />
              <ScrollView style={styles.container}>
                <View style={styles.homeContainer}>
                  <View>
                    {
                      data && data.allRestaurants ?
                        data.allRestaurants.map(
                          ({name, image, description, waitTime, restaurantId}, i) => (
                            <CardRestaurant
                              onPress={() => this.props.navigation.navigate('Foods', {restaurantId})}
                              index={i}
                              name={name}
                              image={image}
                              description={description}
                              waitTime={waitTime}
                            />
                            ))
                      : <Text>No Restaurants to show</Text>
                    }
                  </View>
                </View>
              </ScrollView>
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#f7fbff'
  },
  homeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Home = StackNavigator({
  'Restaurants': {
    screen: Restaurants,
    navigationOptions: {
      header: null
    }
  },
  'Foods': {
    screen: Food,
    navigationOptions: {
      header: null
    }
  },
  'FoodItem': {
    screen: FoodItem,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  }}, { initialRouteName: 'Restaurants' })


class Join extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return(
      <Home />
    )
  }
}


export default Join
