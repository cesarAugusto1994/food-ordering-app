import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native'
import { Query } from "react-apollo";
import { connect } from 'redux-zero/react'


import CardRestaurant from '../../components/CardOverlay';
import ShoppingCart from '../../components/TouchableIcon';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

import { colors, fonts } from '../../theme';
import {styles} from '../Restaurants/Restaurants';
import actions from '../../store/actions';
import {filterRestaurants} from '../../graphql/client';


const RestaurantList = ({navigation: {navigate, state}}) => {
  return (
    <Query query={filterRestaurants} fetchPolicy='cache-and-network' variables={{speciality: state.params.name}}>
      {({loading, err, data}) => {
        if(loading) return <Spinner text="Carregando os restaurantes ..."/>
        if(err) return (
          <Error
            emoji='😰'
            text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos a list de restaurantes. Feche e volte a abrir a aplicaçao!`}
          />
        )
        if(data.listRestaurants.items.length === 0 ) return (
          <Error
            text='Oops! Não pudemos satisfazer a sua pesquisa'
            textStyle={{fontSize: 18}}/>
        )
        return (
          <React.Fragment>
            <ScrollView style={styles.container}>
              {
                data.listRestaurants.items.map(
                  ({name, image, description, waitTime, restaurantId}, i) => (
                    <CardRestaurant
                      onPress={
                        () => navigate('Foods', {restaurantId}
                        )
                      }
                      index={restaurantId}
                      key={restaurantId}
                      contentPosition="center"
                      source={{uri: image}}
                      overlayAlpha={0.3}
                      rounded={5}
                    >
                    {() => (
                      <React.Fragment key={restaurantId}>
                        <Text style={styles.text}>{name.toUpperCase()}</Text>
                        <View style={styles.waitTime}>
                          <Text style={styles.text2}>Tempo de espera: {waitTime}min</Text>
                        </View>
                      </React.Fragment>

                    )}
                    </CardRestaurant>
                  )
                )
              }
            </ScrollView>
          </React.Fragment>
        )
      }}
    </Query>
  )
};

const mapToProps = ({user}) => ({user});
export default connect(mapToProps, actions)(RestaurantList);
