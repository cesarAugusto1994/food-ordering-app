import React, { Component } from 'react';
// import {Text, AsyncStorage} from 'react-native';
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
  // state = {
  //   isAuthed: false,
  //   isLoading: true
  // }
  _bootstrapAsync = async () => {
    console.log('DID')
      const value = await AsyncStorage.getItem('@app:session');
      if (value !== null) {
        const user = JSON.parse(value);
        console.log('UUU', user);
        if(user && user.isUser === true) {
          // this.setState({isAuthed: true, isLoading: false})
          this.props.navigation.navigate('Cliente');
        }
        if(user && user.isOwner === true) {
          // this.setState({isAuthed: true, isLoading: false})
          this.props.navigation.navigate('Restaurante');
        }
      } else {
        // this.setState({isAuthed: true, isLoading: false})
        this.props.navigation.navigate('Auth')
      }
  }
  // async componentDidMount(nextProps) {
  //   console.log('WILL')
  //     const value = await AsyncStorage.getItem('@app:session');
  //     if (value !== null) {
  //       const user = JSON.parse(value);
  //       console.log('UUU', user);
  //       if(user && user.isUser === true) {
  //         this.setState({isAuthed: true, isOwner: false, isUser: true, isLoading: false})
  //         this.props.navigation.navigate('Cliente');
  //       }
  //       if(user && user.isOwner === true) {
  //         this.setState({isAuthed: true, isOwner: true, isUser: false, isLoading: false})
  //         this.props.navigation.navigate('Restaurante');
  //       }
  //     } else {
  //       this.setState({isAuthed: true , isLoading: false})
  //       this.props.navigation.navigate('Auth')
  //     };
  // }
  render() {
    console.log('PROPS', this.props)
      // if (this.state.isLoading) {
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
      // }
      // console.log('---------------<', this.state)
      // return (
      //   <View style={[styles.container, styles.horizontal]}>
      //     <Text>Continuar</Text>
      //   </View>
      // )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
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

export default connect(mapToProps, actions)(CheckAuth)

// import React from 'react';
// import {
//   ActivityIndicator,
//   AsyncStorage,
//   Button,
//   StatusBar,
//   StyleSheet,
//   View,
// } from 'react-native';
// import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

// class SignInScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Please sign in',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Sign in!" onPress={this._signInAsync} />
//       </View>
//     );
//   }

//   _signInAsync = async () => {
//     await AsyncStorage.setItem('userToken', 'abc');
//     this.props.navigation.navigate('App');
//   };
// }

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome to the app!',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Show me more of the app" onPress={this._showMoreApp} />
//         <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
//       </View>
//     );
//   }

//   _showMoreApp = () => {
//     this.props.navigation.navigate('Other');
//   };

//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
// }

// class OtherScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Lots of features here',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }

//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
// }

// class AuthLoadingScreen extends React.Component {
//   constructor() {
//     super();
//     this._bootstrapAsync();
//   }

//   // Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');

//     // This will switch to the App screen or Auth screen and this loading
//     // screen will be unmounted and thrown away.
//     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
//   };

//   // Render any loading content that you like here
//   render() {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

// export default createSwitchNavigator(
//   {
//     AuthLoading: AuthLoadingScreen,
//     App: AppStack,
//     Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'AuthLoading',
//   }
// );
