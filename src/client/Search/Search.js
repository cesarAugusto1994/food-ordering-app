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
import { GET_SPECIALITIES } from '../../graphql/client';
import actions from '../../store/actions';
import CardOverlay from '../../components/CardOverlay';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';


class Search extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Query query={GET_SPECIALITIES} fetchPolicy='cache-and-network'>
        {({data, loading, err}) =>  {
          if(loading) return <Spinner text="Carregando as especialidades ..."/>
          if(err) return (
            <Error
              emoji='😰'
              text={`Sentimos muito, ocorreu-se algum error enquanto carregavamos a lista de especialidades. Feche e volte a abrir a aplicaçao!`}
            />
          )
          return (
            <View style={styles.container}>
              <GridView
                itemDimension={130}
                items={data.specialities}
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
        }}
      </Query>
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
