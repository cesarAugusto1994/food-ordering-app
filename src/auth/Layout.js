import React, { Component } from 'react';
import {Platform, Linking, Text, View, Image, AsyncStorage} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';
import { NavigationActions, StackNavigator, StackActions } from 'react-navigation';

import { connect } from 'redux-zero/react';
import actions from '../store/actions';
import Expo from "expo";


import styles from './styles';
import config from '../../config';

import GoogleAuth from './buttons/google';
import FacebookAuth from './buttons/facebook';


const findOrCreateUser = async (
  client,
  mutationFn,
  userData,
  {
    mutationModel,
    mutationName,
    mutation,
    query,
    queryName,
    id
  }) => {

  const variables= { ...userData};
  const {email} = userData;
  await client.resetStore();
  return client.query({query: query, variables: {email: email}})
    .then(response => {
      if (
        response.data
        && response.data[queryName]
        && response.data[queryName].items.length !== 0
        ) {
        const {
          data: {
            [queryName]: {
              items
            }
          }
        } = response;
        return Promise.resolve(items[0]);
      }
      return mutationFn({
        mutation,
        variables,
        optimisticResponse: {
          [mutationName]: { ...variables, __typename: mutationModel },
          __typename: 'Mutation'
        },
      })
        .then(response => {
          const {data} = response;
          return {
            email: data[mutationName].email,
            [id]: data[mutationName][id],
            firstName: data[mutationName].firstName,
            lastName: data[mutationName].lastName,
            image: data[mutationName].image
          }
        })
        .catch(err => ({err, message: 'Could not create a user'}))
    })
    .catch(error => ({err, message: 'Could not find a user'}))
}

class SignIn extends Component {
  state = {
    processing: false
  }
  googleSignIn = async (e, {client, mutationFn}) => {
    e.preventDefault();
    const {query, queryName, mutation, mutationName, mutationModel, whoIs} = this.props;
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: config.androidClientId,
        iosClientId: config.iosClientId,
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        const user = {
          firstName: result.user.givenName,
          email: result.user.email,
          lastName: result.user.familyName,
          image: result.user.photoUrl
        };
        const id = whoIs.isUser ? 'userId' : 'ownerId';
        findOrCreateUser(
          client,
          mutationFn,
          {
            ...user,
            [id]: uuid()
          }, {
            query,
            queryName,
            mutation,
            mutationName,
            mutationModel,
            id
        })
          .then(async response => {
            await AsyncStorage.setItem('@app:session', JSON.stringify({user: {...user, [id]: whoIs.isOwner ? response[id] : response[id]}, ...whoIs}));
            this.props.signOn({...user, [id]: whoIs.isOwner ? response[id] : response[id]});
            this.props.whoIs.isOwner === true
            ? this.props.navigation.push('Restaurante')
            : this.props.navigation.push('Cliente')
          })
          .catch(err => ({err}));
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  facebookSignIn = async (e, {client, mutationFn}) =>  {
    e.preventDefault();
    const {query, queryName, mutation, mutationName, mutationModel, whoIs} = this.props;
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(config.facebookAppId, {
        permissions: ['public_profile', 'email'],
        behavior: 'web'
      });
    if (type === 'success') {
      const result = await (await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture,first_name,last_name`)).json();
      const user = {
        firstName: result.first_name,
        email: result.email,
        lastName: result.last_name,
        image: 'http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png'
      };
      const id = whoIs.isUser ? 'userId' : 'ownerId';
      findOrCreateUser(
        client,
        mutationFn,
        {
          ...user,
          [id]: uuid()
        }, {
          query,
          queryName,
          mutation,
          mutationName,
          mutationModel,
          id
      })
        .then(async response => {
          await AsyncStorage.setItem('@app:session', JSON.stringify({user: {...user, [id]: whoIs.isOwner ? response[id] : response[id]}, ...whoIs}));
          this.props.signOn({...user, [id]: whoIs.isOwner ? response[id] : response[id]});
          this.props.whoIs.isOwner === true
          ? this.props.navigation.push('Restaurante')
          : this.props.navigation.push('Cliente');
        })
        .catch(err => ({err}));
    }
  }
  render() {
    const { greeting, greeting2, imagePath, mutation } = this.props;
    return (
      <Mutation mutation={mutation}>
        {(mutationFn, {data, client}) => (
          <View style={styles.user.container}>
            <View style={styles.user.heading}>
              <Image
                source={imagePath}
                style={styles.user.headingImage}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.user.greeting]}>{greeting}</Text>
            <Text style={[styles.user.greeting2]}>{greeting2}</Text>
            <View style={styles.user.inputContainer}>
              <FacebookAuth loginWithFacebook={async e => await this.facebookSignIn(e, {mutationFn, client})}/>
              <GoogleAuth loginWithGoogle={async e => await this.googleSignIn(e, {mutationFn, client})}/>
            </View>
          </View>
        )}
      </Mutation>
    );
  }
};

const mapToProps = ({ isAuthed, user, isUser, isOwner }) => ({ isAuthed, user, isUser, isOwner });
export default connect(mapToProps, actions)(SignIn);
