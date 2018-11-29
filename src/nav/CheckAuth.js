/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { withApollo } from 'react-apollo';
import Spinner from '../components/Spinner';

class CheckAuth extends Component {
  async componentDidMount() {
    const value = await AsyncStorage.getItem('@app:session');
    if (value !== null) {
      const user = JSON.parse(value);
      if (user && user.isUser === true) {
        this.props.client.writeData({
          data: {
            auth: {
              isAuthed: true,
              __typename: 'Auth',
            },
            user: {
              ...user.user,
              id: user.user.id,
              isOwner: user.isOwner,
              isUser: user.isUser,
              __typename: 'User',
            },
          },
        });
        this.props.navigation.navigate('Cliente');
      }
      if (user && user.isOwner === true) {
        this.props.client.writeData({
          data: {
            auth: {
              isAuthed: true,
              __typename: 'Auth',
            },
            user: {
              ...user.user,
              id: user.user.id,
              isOwner: user.isOwner,
              isUser: user.isUser,
              __typename: 'User',
            },
          },
        });
        this.props.navigation.navigate('Restaurante');
      }
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return <Spinner />;
  }
}

export default withApollo(CheckAuth);
