import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { colors, fonts } from '../theme'
import Cliente from './Cliente'
import Restaurante from './Restaurante'

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
})

const routes = {
  Cliente: {
    screen: Cliente,
    navigationOptions: {
      header: null,
      title: 'Cliente',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/avatar.png')}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  },
  Restaurante: {
    screen: Restaurante,
    navigationOptions: {
      title: 'Restaurante',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/shop.png')}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  }
}

const routeConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: true,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.secondary,
    indicatorStyle: { backgroundColor: colors.secondary },
    labelStyle: {
      fontSize: 12
    },
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      paddingBottom: 3
    },
  }
}

export default {routes, routeConfig}
