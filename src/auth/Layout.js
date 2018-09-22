import React, { Component } from 'react';
import {Platform, Linking, Text, View, Image, AsyncStorage} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { graphql } from 'react-apollo';
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
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: config.androidClientId,
        iosClientId: config.iosClientId,
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
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
              <GoogleAuth loginWithGoogle={this.signIn}/>
            </View>
          </View>
    );
  }
}


const authedUser = gql`
  mutation authedUser($user: User) {
    currentUser(user: $user) {
      userId
    }
  }
`;

const mapToProps = ({ isAuthed, user, isUser, isOwner }) => ({ isAuthed, user, isUser, isOwner });
export default connect(mapToProps, actions)(graphql(authedUser)(SignIn));
