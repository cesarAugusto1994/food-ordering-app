import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native'
import { Query, graphql } from "react-apollo";
import { connect } from 'redux-zero/react'


import CardRestaurant from '../../components/CardOverlay';
import ShoppingCart from '../../components/TouchableIcon';

import { colors, fonts } from '../../theme'
import {getRestaurants} from '../../graphql/client'

class Restaurants extends React.Component {
  render() {
    return (
      <Query query={getRestaurants}>
        {({loading, err, data}) => {
          console.log('----->', {data, err})
          return (
            <React.Fragment>
              <ScrollView style={styles.container}>
                {
                  data && data.listRestaurants ?
                    data.listRestaurants.items.map(
                      ({name, image, description, waitTime, restaurantId}, i) => (
                        <CardRestaurant
                          onPress={
                            () => this.props.navigation.navigate('Foods', {restaurantId}
                            )
                          }
                          index={restaurantId}
                          key={restaurantId}
                          contentPosition="center"
                          source={{uri: image}}
                          overlayAlpha={0.3}
                          rounded={5}
                        >
                        {() => (
                          <React.Fragment key={restaurantId}>
                            <Text style={styles.text}>{name.toUpperCase()}</Text>
                            <View style={styles.waitTime}>
                              <Text style={styles.text2}>Tempo de espera: {waitTime}min</Text>
                            </View>
                          </React.Fragment>

                        )}
                        </CardRestaurant>
                        ))
                  : <Text>No Restaurants to show</Text>
                }
              </ScrollView>
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#f7fbff'
  },
  waitTime: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: '110%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  text2: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  }
});

export default Restaurants;
