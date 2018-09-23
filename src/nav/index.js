import React from 'react'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation'


//Auth Routes
import Auth from '../auth/nav';

// Cliente Routes
import Cliente from './Cliente';
import Food from '../client/Restaurants/Foods/Food'
import FoodItem from '../client/Restaurants/Foods/FoodItem'


//Owner Routes
import Owner from './Owner';
import NewRestaurant from '../owner/NewRestaurant'
import EditRestaurant from '../owner/EditRestaurant';
import MyFoods from '../owner/Foods';




const ClienteSubRoutes = {
  'Foods': {
    screen: Food,
    navigationOptions: {
      header: null
    }
  },
  'FoodItem': {
    screen: FoodItem,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  }
};


const OwnerSubRoutes = {
  NewRestaurant: {
    screen: NewRestaurant,
    navigationOptions: {
      header: null
    }
  },
  EditRestaurant: {
    screen: EditRestaurant,
    navigationOptions: {
      header: null
    }
  },
  MyFoods: {
    screen: MyFoods,
    navigationOptions: {
      header: null
    }
  }
};


// Bottom Navigators
const AuthScreen = createBottomTabNavigator(Auth.routes, Auth.routeConfig)
const ClienteScreen = createBottomTabNavigator(Cliente.routes, Cliente.routeConfig)
const OwnerScreen = createBottomTabNavigator(Owner.routes, Owner.routeConfig)



const AppNavigator = createStackNavigator({
  //Routes With Bottom Navigation
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      header: null
    }
  },
  Cliente: {
    screen: ClienteScreen,
    navigationOptions: {
      header: null
    }
  },
  Restaurante: {
    screen: OwnerScreen,
    navigationOptions: {
      header: null
    }
  },

  //Internal Routes
  ...OwnerSubRoutes,
  ...ClienteSubRoutes
}, {
  initialRouteName: 'Cliente'
});

export default AppNavigator;
