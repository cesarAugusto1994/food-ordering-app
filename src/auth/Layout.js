import React, { Component } from 'react';
import {Platform, Linking, Text, View, Image, AsyncStorage} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// import SafariView from 'react-native-safari-view';
import { NavigationActions, StackNavigator } from 'react-navigation';

import { connect } from 'redux-zero/react';
import actions from '../store/actions';
import Expo from "expo"


import styles from './styles';
import config from '../../config';

import GoogleAuth from './buttons/google'
import FacebookAuth from './buttons/facebook'

class SignIn extends Component {
  signIn = async (e, findOrCreateUser) => {
    e.preventDefault();
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
        console.log('---_>', user)
        findOrCreateUser({
          variables: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image
          }
        });
        this.props.signOn(user);
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render() {
    console.log('Browser ----> props', this.props)
    console.log('Browser ----> state', this.state)
    const {greeting, greeting2, imagePath} = this.props;
    return (
      <Mutation mutation={CREATE_USER}>
        {(findOrCreateUser, {data}) => (
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
                <GoogleAuth loginWithGoogle={async e => await this.signIn(e, findOrCreateUser)}/>
              </View>
            </View>
        )}
      </Mutation>
    );
  }
};

const CREATE_USER = gql`
  mutation FindOrCreate(
      $email: String!,
      $firstName: String!,
      $lastName: String!,
      $image: String!
    ) {
    findOrCreate(
      email: $email,
      firstName: $firstName,
      lastName: $lastName,
      image: $image
    ) {
      userId
      firstName
      lastName
      image
      email
    }
  }
`;


const mapToProps = ({ isAuthed, user, isUser, isOwner }) => ({ isAuthed, user, isUser, isOwner });
export default connect(mapToProps, actions)(SignIn);
