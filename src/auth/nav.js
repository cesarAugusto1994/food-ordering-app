/* eslint-disable global-require */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import Customer from './Cliente';
import Owner from './Restaurante';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

const routes = {
  CustomerSignOn: {
    screen: Customer,
    navigationOptions: {
      header: null,
      title: 'Cliente',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('../assets/avatar.png')} style={[styles.icon, { tintColor }]} />
      ),
    },
  },
  OwnerSignOn: {
    screen: Owner,
    navigationOptions: {
      title: 'Restaurante',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('../assets/shop.png')} style={[styles.icon, { tintColor }]} />
      ),
    },
  },
};

const routeConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: true,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.grey,
    indicatorStyle: { backgroundColor: colors.grey },
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      paddingBottom: 3,
    },
  },
};

export default { routes, routeConfig };
