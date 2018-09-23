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

import BackButton from '../components/Button';
import ImageOverlay from '../components/CardOverlay';
import AddButton from '../components/TouchableIcon';
import Header from '../components/HeaderWithChildren';
import Card from '../components/Card';

import { connect } from 'redux-zero/react';
import actions from '../store/actions';

import { colors, fonts } from '../theme';
import { myRestaurants } from '../graphql/owner/getMyRestaurants';

class MyRestaurants extends React.Component {
  render() {
    const {goBack, navigate} = this.props.navigation
    // const ownerId = this.props.navigation.getParam('ownerId');
    const ownerId = "fejf zjf";
    console.log('---->', this.props)
    return (
      <Query query={myRestaurants} variables={{ownerId}}>
        {({loading, err, data}) => {
        return (
          <View style={styles.container}>
            <Header color={colors.primary}>
              {() => (
                <React.Fragment>
                  <Text style={{color: '#fff'}}>Meus Restaurantes</Text>
                  <AddButton
                    onPress={() => navigate('NewRestaurant', {value: {ownerId}})}
                    iconName="plus"
                  />
                </React.Fragment>
              )}
            </Header>
            <ScrollView>
            {
                data.getMyRestaurants ?
                data.getMyRestaurants.map(
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
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
})
const mapToProps = ({
  isAuthed,
  user,
  currentUser
}) => ({
  isAuthed,
  user,
  currentUser
});

export default connect(mapToProps, actions)(MyRestaurants);
