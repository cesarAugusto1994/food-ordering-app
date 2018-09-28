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
      <Text>Hey</Text>
      // <Query query={myRestaurants} variables={{ownerId}}>
      //   {({loading, err, data}) => {
      //   return (
      //     <View style={styles.container}>
      //       <ScrollView>
      //       {
      //           data.getMyRestaurants ?
      //           data.getMyRestaurants.map(
      //             ({name, description, image, waitTime, speciality, location, restaurantId}) => (
      //                 <ImageOverlay
      //                   index={restaurantId}
      //                   source={{uri: image}}
      //                   onPress={
      //                     () => this.props.navigation.navigate('EditRestaurant', {
      //                       restaurantId,
      //                       ownerId,
      //                       value: {
      //                         name,
      //                         description,
      //                         location,
      //                         waitTime,
      //                         speciality,
      //                         image
      //                       }
      //                     })
      //                   }
      //                   contentPosition="center"
      //                   overlayAlpha={0.3}
      //                   rounded={5}
      //                 >
      //                 {() => (
      //                   <Text style={styles.text}>{name.toUpperCase()}</Text>
      //                 )}
      //                 </ImageOverlay>
      //             ))
      //           : <Text>Este restaurante ainda não tem refeições disponiveis</Text>
      //         }
      //       </ScrollView>
      //     </View>
      //   )}}
      // </Query>
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
