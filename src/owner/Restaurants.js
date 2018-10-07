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

import ImageOverlay from '../components/CardOverlay';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import Error from '../components/Error';

import { connect } from 'redux-zero/react';
import actions from '../store/actions';

import { colors, fonts } from '../theme';
import { myRestaurants } from '../graphql/owner';

class MyRestaurants extends React.Component {
  render() {
    const {goBack, navigate, getParam} = this.props.navigation
    const {ownerId} = this.props.user;
    return (
      <Query query={myRestaurants} variables={{ownerId}} fetchPolicy='cache-and-network'>
        {({loading, err, data}) => {
          if(loading) return <Spinner text="Carregando os seus restaurantes ..."/>
          if(err) return (
            <Error
              emoji='😰'
              text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos a lista de seus restaurantes. Feche e volte a abrir a aplicaçao!`}
            />
          )
          return (
            <View style={styles.container}>
              <ScrollView>
                {
                  data.listRestaurants.items.map(
                    ({name, description, image, waitTime, speciality, location, restaurantId}) => (
                        <ImageOverlay
                          index={restaurantId}
                          source={{uri: image}}
                          onPress={
                            () => this.props.navigation.navigate('EditRestaurant', {
                              restaurantId,
                              ownerId,
                              value: {
                                name,
                                description,
                                location,
                                waitTime,
                                speciality,
                                image
                              }
                            })
                          }
                          contentPosition="center"
                          overlayAlpha={0.3}
                          rounded={5}
                        >
                        {() => (
                          <Text style={styles.text}>{name.toUpperCase()}</Text>
                        )}
                        </ImageOverlay>
                    ))
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
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
})
const mapToProps = ({user}) => ({user});
export default connect(mapToProps, actions)(MyRestaurants);
