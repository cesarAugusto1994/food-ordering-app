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
import actions from '../../store/actions';
import CardOverlay from '../../components/CardOverlay';


class Search extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    console.log('----> search props', this.props)
    return (
      <View style={styles.container}>
        <GridView
          itemDimension={130}
          items={this.props.categories}
          style={styles.gridView}
          renderItem={item => (
            <View style={[styles.itemContainer]}>
              <CardOverlay
                imageStyle={styles.imageStyle}
                wrapperStyle={styles.wrapperStyle}
                onPress={() => this.props.navigation.navigate('Filter', {name: item.name})}
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
});

const mapToProps = ({ categories }) => ({ categories });

export default connect(mapToProps, actions)(Search);
