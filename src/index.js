import React from 'react';
import {
  StatusBar,
  AsyncStorage,
  Text,
  View
} from 'react-native';
import {connect} from 'redux-zero/react';


import actions from './store/actions';

import AppNavigator from './nav';
const App = () => <AppNavigator />;

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
