import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { connect } from 'redux-zero/react'
import {RkCard, RkButton, rkCardImg, rkCardHeader, rkCardContent, rkCardFooter} from 'react-native-ui-kitten';
import { Header, SearchBar } from 'react-native-elements';

import { colors, fonts } from '../../theme'

const BackButton = (props) => (
  <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
    <Image style={styles.icon} source={require('../../assets/backward.png')}/>
  </TouchableOpacity>
)

class Search extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={colors.primary}
          centerComponent={{ text: 'Procurar', style: { color: '#fff' } }}
        />
        <SearchBar
          lightTheme={true}
          onChangeText={() => {}}
          onClearText={() => {}}
          placeholder='Procurar restaurantes ou refeiçoes' />
        <Text>Este restaurante ainda não tem refeições disponiveis</Text>
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
  info: {
    paddingTop: 0,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 0.3,
    borderColor: '#cccccc',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    padding: 5,
    paddingLeft: 3,
    height: 70,
    width: 80,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 16,
    color: '#0c0e11',
    textAlign: 'left'
  },
  priceText: {
      color: colors.primary,
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: '#fff'
  }
})

export default Search
