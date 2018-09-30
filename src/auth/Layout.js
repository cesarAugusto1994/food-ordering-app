import React, { Component } from 'react';
import {Platform, Linking, Text, View, Image, AsyncStorage} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';
import { NavigationActions, StackNavigator } from 'react-navigation';

import { connect } from 'redux-zero/react';
import actions from '../store/actions';
import Expo from "expo"


import styles from './styles';
import config from '../../config';

import GoogleAuth from './buttons/google';
import FacebookAuth from './buttons/facebook';


const findOrCreateUser = (
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
  signIn = async (e, {client, mutationFn,data, dddd}) => {
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
          .then(async d => {
            await AsyncStorage.setItem('@app:session', JSON.stringify({user, ...this.props.whoIs}));
            this.props.whoIs.isOwner === true
            ? this.props.navigation.push('Restaurante')
            : this.props.navigation.push('Cliente');
          })
          .catch(err => ({err}));
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render() {
    const { greeting, greeting2, imagePath, mutation } = this.props;
    return (
      <Mutation mutation={mutation}>
        {(mutationFn, {data, client}, dddd) => (
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
                <FacebookAuth />
                <GoogleAuth loginWithGoogle={async e => await this.signIn(e, {mutationFn, client, data, dddd})}/>
              </View>
            </View>
        )}
      </Mutation>
    );
  }
};

const mapToProps = ({ isAuthed, user, isUser, isOwner }) => ({ isAuthed, user, isUser, isOwner });
export default connect(mapToProps, actions)(SignIn);
