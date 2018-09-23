import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


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

import {colors} from '../theme'
import TouchableIcon from '../components/TouchableIcon'

const navigationStyle = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
}

const ClienteSubRoutes = {
  'Foods': {
    screen: Food,
    navigationOptions: {
      title: 'Refeições',
      ...navigationStyle
    }
  },
  'FoodItem': {
    screen: FoodItem,
    navigationOptions: ({navigation}) => console.log('NAVVVV', {navigation}) || ({
      title: navigation.state.params.name,
      ...navigationStyle
    })
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
    navigationOptions: ({navigation}) => {
      const style = { ...navigationStyle}
      switch(navigation.state.index) {
        case 0: {
          style.title = 'Restaurantes';
          style.headerRight = (
            <TouchableIcon
              iconName='shopping-cart'
              size={30} color='#fff'
              style={{marginRight: 20}}
            />
          );
          return style;
        }
        case 1: {
          style.title = 'Procurar';
          return style;
        }
        case 2: {
          style.title = 'Recibos';
          return style;
        }
        case 3: {
          style.title = 'Meu Perfil';
          return style;
        }
      }
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
