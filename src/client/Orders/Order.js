import React from 'react';
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
import gql from 'graphql-tag';
import { connect } from 'redux-zero/react';
import actions from '../../store/actions';
import Card from '../../components/Card';
import OrderButton from '../../components/Button';

import { colors, fonts } from '../../theme';

class Search extends React.Component {
  render() {
    console.log('current State --->', this.state);
    console.log('current props --->', this.props.store.getState());
    const {card} = this.props.store.getState();

    return (
      <View style={styles.container}>
        <Text>Este restaurante ainda não tem refeições disponiveis</Text>
        <ScrollView>
          {
            card.map(
              ({itemName, itemPrice, foodId}) => (
                <Card
                  description=''
                  index={foodId}
                  name={itemName}
                  price={itemPrice}
                  foodId={foodId}
                />
              )
            )
          }
        </ScrollView>
        <OrderButton
          onPress={() => {}}
          iconName='sign-out'
          text="Encomendar"
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

const mapToProps = ({ card }) => ({ card })

export default connect(mapToProps, actions)(Search);
