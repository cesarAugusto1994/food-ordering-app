import React from 'react'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import Cliente from './Cliente';
import Owner from './Owner';

import Auth from '../auth/nav'
import NewRestaurant from '../owner/NewRestaurant'
import EditRestaurant from '../owner/EditRestaurant';
import MyFoods from '../owner/Foods';

const AuthScreen = createBottomTabNavigator(Auth.routes, Auth.routeConfig)



const AppNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Cliente,
  Restaurante: Owner,
  NewRestaurant,
  EditRestaurant,
  MyFoods
}, {initialRouteName: 'Restaurante'})

export default AppNavigator;



// const routeConfig = {
//   Init: { screen: Init }
// }

// const StackNav = createStackNavigator(routeConfig)

// class Nav extends React.Component {
//   render() {
//     return (
//       <StackNav />
//     )
//   }
// }

// export default StackNav
