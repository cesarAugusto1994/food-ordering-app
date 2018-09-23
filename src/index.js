import React from 'react';
import {
  StatusBar,
  AsyncStorage,
  Text,
  View
} from 'react-native';

import {
  graphql,
  Mutation
} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'redux-zero/react';


import actions from './store/actions';

import AppNavigator from './nav';
class App extends React.Component {
  state = {
    isLoading: false,
    isAuthed: false,
    isUser: false,
    isOwner: false
  }
  render() {
    const {isLoading, isAuthed, isOwner, isUser} = this.props.store.getState();
    // console.log('Store State --->', this.props.store.getState())
    // console.log('App State ----->', this.state)
    return (
      <AppNavigator />
    )
  }
};

const mapToProps = ({
  isAuthed,
  user,
  currentUser,
  isOwner,
  isUser
}) => ({
  isAuthed,
  user,
  currentUser,
  isOwner,
  isUser
});
export default connect(mapToProps, actions)(App);
