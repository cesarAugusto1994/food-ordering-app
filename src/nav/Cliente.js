import React from 'react';
import { Image, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors, fonts } from '../theme'
import Restaurants from '../client/Restaurants/Restaurants'
import Search from '../client/Search/Search'
import Profile from '../client/Profile/Profile'
import SignUp from '../auth/Restaurante'

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
})

const routes = {
  Restaurants: {
    screen: Restaurants,
    navigationOptions: {
      title: 'Restaurantes',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='home' size={30} color={tintColor}/>
      )
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Categorias',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='filter' size={30} color={tintColor}/>
      )
    }
  },
  Invoice: {
    screen: SignUp,
    navigationOptions: {
      title: 'Recibos',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='barcode' size={30} color={tintColor}/>
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Perfil',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='user' size={30} color={tintColor}/>
      )
    }
  }
}

const routeConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#191919',
    inactiveTintColor: 'white',
    indicatorStyle: { backgroundColor: 'white' },
    labelStyle: {
      fontSize: 12
    },
    style: {
      backgroundColor: colors.primary,
      borderTopWidth: 0,
      paddingBottom: 3,
      zIndex: 9999
    },
  }
}

export default {routes, routeConfig}
