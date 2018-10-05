import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { connect } from 'redux-zero/react'
import { Header, SearchBar } from 'react-native-elements';
import GridView from 'react-native-super-grid';

import { colors, fonts } from '../../theme';
import CardOverlay from '../../components/CardOverlay';


class Search extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    item: [
      { name: 'Fast Food', image: 'https://st2.depositphotos.com/1017986/7580/i/950/depositphotos_75807441-stock-photo-close-up-of-fast-food.jpg' },
      { name: 'Burger', image: 'https://www.vival.fr/images/recette/recette-99.jpg' },
      { name: 'Sushi', image: 'https://img.grouponcdn.com/deal/2CtR2S65oxsqAcBUNaoozYpvjnnW/2C-2048x1229/v1/c700x420.jpg' },
      { name: 'Pizza', image: 'http://biarritz-pizza.fr/img-customer/configuration/5877a032cc3e8.35a3aaeb662bfd222e72443b23bd530b.jpeg' },
      { name: 'Sandwich', image: 'https://static.cuisineaz.com/400x320/i135335-sandwich-dietetique-legumes.jpeg' },
      { name: 'Others', image: 'https://static.cuisineaz.com/400x320/i50715-caldeirada-ragout-de-poisson-portugais.jpg' },
      { name: 'Others', image: 'https://static.cuisineaz.com/400x320/i50715-caldeirada-ragout-de-poisson-portugais.jpg' }
    ]
  }
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme={true}
          onChangeText={() => {}}
          onClearText={() => {}}
          placeholder='Procurar restaurantes ou refeiçoes' />
        <GridView
          itemDimension={130}
          items={this.state.item}
          style={styles.gridView}
          renderItem={item => (
            <View style={[styles.itemContainer]}>
              <CardOverlay
                imageStyle={styles.imageStyle}
                wrapperStyle={styles.wrapperStyle}
                onPress={() => {}}
                contentPosition="center"
                source={{uri: item.image}}
                overlayAlpha={0.3}
                rounded={5}
                children={() => <Text style={styles.text}>{item.name.toUpperCase()}</Text>}
              />
            </View>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomWidth: 0.3,
    borderColor: '#cccccc'
  },
  imageStyle: {
    height: 150,
  },
  wrapperStyle: {
    width: 200,
  },
    gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
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
})

export default Search;
