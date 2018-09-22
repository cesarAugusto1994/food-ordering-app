import React from 'react';
import { StatusBar, AsyncStorage, Text, View } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'redux-zero/react';
import actions from './store/actions';

import Tabs from './auth/Tabs';
import ClienteNav from './nav/Nav';


const ConditionalRenderer = ({isAuthed, isUser, isOwner}) => {
  console.log('Conditional Renderer --->', {isAuthed, isOwner, isUser})
  if (isAuthed && isUser === true) {
    return (
      <ClienteNav />
    );
  }
  if (isAuthed && isOwner === true) {
    return (
      <View>
        <Text>Is Owner</Text>
      </View>
    );
  }
  return (
    <Tabs />
  );
};

class App extends React.Component {
  state = {
    isLoading: true,
    isAuthed: false,
    isUser: false,
    isOwner: false
  }
  getSnapshotBeforeUpdate(props, state) {
    console.log('DerivedState --->', {props, state})
    this.props.store.subscribe(async currentState => {
      console.log('currentState --->', {currentState})
      if(currentState.user && currentState.isOwner === true) {
        await AsyncStorage.setItem('@app:session', JSON.stringify({user: currentState.user, isOwner: true, isUser: false}));
        this.setState({isAuthed: true, isOwner: false, isUser: true, isLoading: false});
      } else if (currentState.isUser === true) {
        await AsyncStorage.setItem('@app:session', JSON.stringify({user: currentState.user, isUser: true, isOwner: false}));
        this.setState({isAuthed: true, isOwner: true, isUser: false, isLoading: false});
      }
    })
  }

  async componentDidMount() {
    console.log('Component Did Mount')
    try {
      let session = await AsyncStorage.getItem('@app:session');
      session = JSON.parse(session);
      console.log('Session ---->', session)
      if(session.user && session.isUser === true) {
        this.setState({isAuthed: true, isOwner: false, isUser: true, isLoading: false});
      } else if(session.user && session.isOwner === true) {
        this.setState({isAuthed: true, isOwner: true, isUser: false, isLoading: false});
      }
      this.setState((state) => ({ isAuthed: false, isOwner: false, isUser: false, isLoading: false}))
    } catch(err) {
      console.log('NO U S E R')
      this.setState((state) => ({ isAuthed: false, isOwner: false, isUser: false, isLoading: false}))
    }
  }

  render() {
    const {isLoading, isAuthed, isOwner, isUser} = this.state;
    console.log('Store State --->', this.props.store.getState())
    console.log('App State ----->', this.state)
    return (
      <React.Fragment>
        { isLoading ? <Text>App is Loading</Text> : ConditionalRenderer({isAuthed, isOwner, isUser, isLoading}) }
      </React.Fragment>
    )
  }
};

const mapToProps = ({ isAuthed, user, currentUser, isOwner, isUser }) => ({ isAuthed, user, currentUser, isOwner, isUser });
export default connect(mapToProps, actions)(App);
