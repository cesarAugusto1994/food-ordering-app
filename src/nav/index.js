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
import CheckAuth from './CheckAuth';
import Food from '../client/Restaurants/Foods/Food';
import Cart from '../client/Orders/Order';
import FoodItem from '../client/Restaurants/Foods/FoodItem';
import RestaurantFilter from '../client/Search/RestaurantList';


//Owner Routes
import Owner from './Owner';
import NewRestaurant from '../owner/NewRestaurant'
import EditRestaurant from '../owner/EditRestaurant';
import NewFood from '../owner/NewFood';
import EditFood from '../owner/EditFood';
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
  Foods: {
    screen: Food,
    navigationOptions: {
      title: 'Refeições',
      ...navigationStyle
    }
  },
  FoodItem: {
    screen: FoodItem,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.name,
      ...navigationStyle
    })
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      title: 'Carrinho',
      ...navigationStyle
    }
  },
  Filter: {
    screen: RestaurantFilter,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.name,
      ...navigationStyle
    })
  }
};


const OwnerSubRoutes = {
  NewRestaurant: {
    screen: NewRestaurant,
    navigationOptions: {
      title: 'Adicionar Restaurante',
      ...navigationStyle
    }
  },
  EditRestaurant: {
    screen: EditRestaurant,
    navigationOptions: {
      title: 'Editar Restaurante',
      ...navigationStyle
    }
  },
  MyFoods: {
    screen: MyFoods,
    navigationOptions: ({navigation, ...props}) => ({
      title: 'Pratos',
      ...navigationStyle,
      headerRight: (
        <TouchableIcon
          iconName='plus'
          onPress={() => navigation.navigate('NewFood')}
          size={30} color='#fff'
          style={{marginRight: 20}}
        />
      )
    })
  },
  NewFood: {
    screen: NewFood,
    navigationOptions: {
      title: 'Adicionar novo prato',
      ...navigationStyle,
    }
  },
  EditFood: {
    screen: EditFood,
    navigationOptions: {
      title: 'Editar prato',
      ...navigationStyle,
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
  CheckAuth: {
    screen: CheckAuth,
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
          style.headerLeft = null;
          style.headerRight = (
            <TouchableIcon
              iconName='shopping-cart'
              onPress={() => navigation.navigate('Cart')}
              size={30}
              color='#fff'
              style={{marginRight: 20}}
            />
          );
          return style;
        }
        case 1: {
          style.title = 'Categorias';
          style.headerLeft = null;
          return style;
        }
        case 2: {
          style.title = 'Recibos';
          style.headerLeft = null;
          return style;
        }
        case 3: {
          style.title = 'Meu Perfil';
          style.headerLeft = null;
          return style;
        }
      }
    }
  },
  Restaurante: {
    screen: OwnerScreen,
    navigationOptions: ({navigation}) => {
      const style = { ...navigationStyle}
      switch(navigation.state.index) {
        case 0: {
          style.title = 'Meus Restaurantes';
          style.headerLeft = null;
          style.headerRight = (
            <TouchableIcon
              iconName='plus'
              onPress={() => navigation.navigate('NewRestaurant')}
              size={30} color='#fff'
              style={{marginRight: 20}}
            />
          );
          return style;
        }
        case 1: {
          style.title = 'Encomendas';
          style.headerLeft = null;
          return style;
        }
        case 2: {
          style.title = 'Meu Perfil';
          style.headerLeft = null;
          return style;
        }
      }
    }
  },

  //Internal Routes
  ...OwnerSubRoutes,
  ...ClienteSubRoutes
}, {
  initialRouteName: 'CheckAuth'
});

export default AppNavigator;
