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

class CheckAuth extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    console.log('DID')
      const value = await AsyncStorage.getItem('@app:session');
      if (value !== null) {
        const user = JSON.parse(value);
        console.log('UUU', user);
        if(user && user.isUser === true) {
          this.props.navigation.navigate('Cliente');
        }
        if(user && user.isOwner === true) {
          this.props.navigation.navigate('Restaurante');
        }
      } else {
        this.props.navigation.navigate('Auth')
      }
  }
  render() {
    // console.log('PROPS', this.props)
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Carregando ...</Text>
      </View>
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

const mapToProps = ({
  isAuthed,
  isOwner,
  isUser,
  user
}) => ({
  isAuthed,
  isOwner,
  isUser,
  user
});

export default connect(mapToProps, actions)(CheckAuth);
