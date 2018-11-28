import React, { Component } from 'react';
import {AsyncStorage, StyleSheet} from 'react-native';
import {graphql, ApolloConsumer} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'redux-zero/react';
import actions from '../store/actions';
import Spinner from '../components/Spinner';

class CheckAuth extends Component {
  async componentDidMount() {
    const value = await AsyncStorage.getItem('@app:session');
    if (value !== null) {
      const user = JSON.parse(value);
      if(user && user.isUser === true) {
        console.log('---->', user)
          this.props.cache.writeData({
            data: {
              auth: {
                isAuthed: true,
                __typename: 'Auth'
              },
              user: {
                ...user.user,
                id: user.user.id,
                isOwner: user.isOwner,
                isUser: user.isUser,
                __typename: 'User'
              }
            }
          });
          this.props.navigation.navigate('Cliente');
        }
        if(user && user.isOwner === true) {
          this.props.cache.writeData({
            data: {
              auth: {
                isAuthed: true,
                __typename: 'Auth'
              },
              user: {
                ...user,
                id: user.id,
                isOwner: user.isOwner,
                isUser: user.isUser,
                __typename: 'User'
              }
            }
          });
          this.props.navigation.navigate('Restaurante');
        }
      } else {
        this.props.navigation.navigate('Auth');
    }
  }
  render() {
    return (
      <Spinner />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff'
  }
})

export default (props) => (
  <ApolloConsumer>
    {cache => (
      <CheckAuth cache={cache} navigation={props && props.navigation}/>
    )}
  </ApolloConsumer>
);
