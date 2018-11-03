import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect} from 'redux-zero/react';
import actions from '../store/actions';
import Spinner from '../components/Spinner';

class CheckAuth extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
      const value = await AsyncStorage.getItem('@app:session');
      if (value !== null) {
        const user = JSON.parse(value);
        if(user && user.isUser === true) {
          this.props.signOnUser({...user, isAuthed: true, userId: user.userId});
          this.props.navigation.navigate('Cliente');
        }
        if(user && user.isOwner === true) {
          this.props.signOnUser({...user, isAuthed: true, ownerId: user.ownerId});
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

const mapToProps = ({signOnUser}) => ({signOnUser});

export default connect(mapToProps, actions)(CheckAuth);
