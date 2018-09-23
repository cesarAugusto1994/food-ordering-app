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
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Header } from 'react-native-elements';
import BackButton from '../components/Button';
import ImageOverlay from '../components/CardOverlay';
import Card from '../components/Card';

import { connect } from 'redux-zero/react';
import actions from '../store/actions';

import { colors, fonts } from '../theme';
import { myRestaurants } from '../graphql/owner/getMyRestaurants';

class MyRestaurants extends React.Component {
  render() {
    const {goBack} = this.props.navigation
    // const ownerId = this.props.navigation.getParam('ownerId');
    const ownerId = "fejf zjf";
    console.log('---->', this.props)
    return (
      <Query query={myRestaurants} variables={{ownerId}}>
        {({loading, err, data}) => {
          console.log('--->', err)
        return (
          <React.Fragment>
            <Header backgroundColor={colors.primary}>
              <Text style={{color: '#fff'}}>Meus Restaurantes</Text>
              <Icon
                name="plus"
                size={20}
                color="#fff"
                onPress={
                  () => this.props.navigation.navigate('NewRestaurant', {
                    value: {ownerId}
                  })
                }
              />
            </Header>
            <ScrollView style={styles.container}>
            {
                data.getMyRestaurants ?
                data.getMyRestaurants.map(
                  ({name, description, image, waitTime, speciality, location, restaurantId}) => (
                      <ImageOverlay
                        key={restaurantId}
                        source={{uri: image}}
                        onPress={
                          () => this.props.navigation.navigate('EditRestaurant', {
                            restaurantId,
                            value: {
                              ownerId,
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
                : <Text>Este restaurante ainda não tem refeições disponiveis</Text>
              }
            </ScrollView>
          </React.Fragment>
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
const mapToProps = ({isAuthed, user, currentUser}) => ({isAuthed, user, currentUser});

export default connect(mapToProps, actions)(MyRestaurants);
