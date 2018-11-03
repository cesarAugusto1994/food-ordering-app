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
import actions from '../../store/actions';
import {getRestaurants} from '../../graphql/client';


class Restaurants extends React.Component {
  render() {
    console.log('---> props rest', this.props)
    return (
      <Query query={getRestaurants} fetchPolicy='cache-and-network'>
        {({loading, err, data}) => {
          if(loading) return <Spinner text="Carregando os restaurantes ..."/>
          if(err) return (
            <Error
              emoji='😰'
              text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos a lista de restaurantes. Feche e volte a abrir a aplicaçao!`}
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
                    ({name, image, description, waitTime, restaurantId, phoneNumber}, i) => (
                      <CardRestaurant
                        onPress={
                          () => this.props.navigation.navigate('Foods', {restaurantId, phoneNumber}
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
  }
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#f7fbff'
  },
  waitTime: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: '110%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  text2: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  }
});

const mapToProps = ({
  isAuthed,
  user,
  isUser,
  isOwner,
  signOnUser
}) => ({
  isAuthed,
  user,
  isUser,
  isOwner,
  signOnUser
});

export default connect(mapToProps, actions)(Restaurants);
