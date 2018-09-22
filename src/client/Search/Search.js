import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { connect } from 'redux-zero/react'
import { Header, SearchBar } from 'react-native-elements';

import { colors, fonts } from '../../theme'


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
  }
})

export default Search
