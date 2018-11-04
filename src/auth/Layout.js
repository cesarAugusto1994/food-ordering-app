import React, { Component } from 'react';
import {Platform, Linking, Text, View, Image, AsyncStorage} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';
import { NavigationActions, StackNavigator, StackActions } from 'react-navigation';

import { connect } from 'redux-zero/react';
import actions from '../store/actions';
import Expo, { AuthSession } from "expo";
import jwtDecoder from "jwt-decode";


import styles from './styles';
import config from '../../config';

import GoogleAuth from './buttons/google';
import FacebookAuth from './buttons/facebook';


function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

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
  // await client.resetStore();

  try {
    const existingUser = await client.query({query, variables: {email: email}});
    console.log({existingUser})
    if (existingUser.data[queryName].items.length !== 0) {
      console.log('INSIDE')
      const { data: { [queryName]: { items } } } = existingUser;
      return items[0];
    }
    console.log('HEEEYEYYEY');
    const newUser = await mutationFn({
      mutation,
      variables,
      optimisticResponse: {
        [mutationName]: { ...variables, __typename: mutationModel },
        __typename: 'Mutation'
      },
    });
    console.log('OOOOOOOO->')
    const {data} = newUser;
    return {
      email: data[mutationName].email,
      [id]: data[mutationName][id],
      firstName: data[mutationName].firstName,
      lastName: data[mutationName].lastName,
      image: data[mutationName].image
    }
  } catch (err) {
    return {err, message: 'Could not find or create a user'}
  }
}

class SignIn extends Component {
  state = {
    processing: false,
    username: ''
  }
  // googleSignIn = async (e, {client, mutationFn}) => {
  //   e.preventDefault();
  //   const {query, queryName, mutation, mutationName, mutationModel, whoIs} = this.props;
  //   try {
  //     const result = await Expo.Google.logInAsync({
  //       androidClientId: config.androidClientId,
  //       androidStandaloneAppClientId: config.androidStandaloneAppClientId,
  //       iosClientId: config.iosClientId,
  //       iosStandaloneAppClientId: config.iosStandaloneAppClientId,
  //       scopes: ["profile", "email"]
  //     })

  //     if (result.type === "success") {
  //       const user = {
  //         firstName: result.user.givenName,
  //         email: result.user.email,
  //         lastName: result.user.familyName,
  //         image: result.user.photoUrl
  //       };
  //       const id = whoIs.isUser ? 'userId' : 'ownerId';
  //       findOrCreateUser(
  //         client,
  //         mutationFn,
  //         {
  //           ...user,
  //           [id]: uuid()
  //         }, {
  //           query,
  //           queryName,
  //           mutation,
  //           mutationName,
  //           mutationModel,
  //           id
  //       })
  //         .then(async response => {
  //           await AsyncStorage.setItem('@app:session', JSON.stringify({user: {...user, [id]: whoIs.isOwner ? response[id] : response[id]}, ...whoIs}));
  //           this.props.signOn({...user, [id]: whoIs.isOwner ? response[id] : response[id]});
  //           this.props.whoIs.isOwner === true
  //           ? this.props.navigation.push('Restaurante')
  //           : this.props.navigation.push('Cliente')
  //         })
  //         .catch(err => ({err}));
  //     } else {
  //       console.log("cancelled")
  //     }
  //   } catch (e) {
  //     console.log("error", e)
  //   }
  // }
  _loginWithAuth0Twitter = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    const result = await AuthSession.startAsync({
      authUrl: `${config.auth0Domain}/authorize` + toQueryString({
        // connection: 'facebook',
        client_id: config.auth0ClientId,
        response_type: 'token',
        scope: 'openid name',
        redirect_uri: redirectUrl,
      }),
    });

    console.log(result);
    if (result.type === 'success') {
      this.handleParams(result.params);
    }
  }

  handleParams = (responseObj) => {
    if (responseObj.error) {
      Alert.alert('Error', responseObj.error_description
      || 'something went wrong while logging in');
      return;
    }
    const encodedToken = responseObj.id_token;
    const decodedToken = jwtDecoder(encodedToken);
    const username = decodedToken.name;
    console.log({decodedToken});
    this.setState({ username });
  }
  // facebookSignIn = async (e, {client, mutationFn}) =>  {
  //   e.preventDefault();
  //   const {query, queryName, mutation, mutationName, mutationModel, whoIs} = this.props;
  //   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1029457293903156', {
  //       permissions: ['public_profile', 'email'],
  //       behavior: 'web'
  //     });
  //   if (type === 'success') {
  //     const result = await (await fetch(
  //       `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture,first_name,last_name`)).json();
  //     const user = {
  //       firstName: result.first_name,
  //       email: result.email,
  //       lastName: result.last_name,
  //       image: 'http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png'
  //     };
  //     const id = whoIs.isUser ? 'userId' : 'ownerId';
  //     findOrCreateUser(
  //       client,
  //       mutationFn,
  //       {
  //         ...user,
  //         [id]: uuid()
  //       }, {
  //         query,
  //         queryName,
  //         mutation,
  //         mutationName,
  //         mutationModel,
  //         id
  //     })
  //       .then(async response => {
  //         await AsyncStorage.setItem('@app:session', JSON.stringify({user: {...user, [id]: whoIs.isOwner ? response[id] : response[id]}, ...whoIs}));
  //         this.props.signOn({...user, [id]: whoIs.isOwner ? response[id] : response[id]});
  //         this.props.whoIs.isOwner === true
  //         ? this.props.navigation.push('Restaurante')
  //         : this.props.navigation.push('Cliente');
  //       })
  //       .catch(err => ({err}));
  //   }
  // }
  render() {
    const { greeting, greeting2, imagePath, mutation } = this.props;
    console.log({state: this.state})
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
              {/* <FacebookAuth loginWithFacebook={async e => await this.facebookSignIn(e, {mutationFn, client})}/> */}
              <FacebookAuth loginWithFacebook={e => this._loginWithAuth0Twitter(e, {mutationFn, client})}/>
              {/* <GoogleAuth loginWithGoogle={async e => await this.googleSignIn(e, {mutationFn, client})}/> */}
            </View>
          </View>
        )}
      </Mutation>
    );
  }
};

const mapToProps = ({ isAuthed, user, isUser, isOwner }) => ({ isAuthed, user, isUser, isOwner });
export default connect(mapToProps, actions)(SignIn);
