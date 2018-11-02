import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'redux-zero/react';
import uuidv4 from 'uuid/v4';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import actions from '../store/actions';
import Card from '../components/OwnerOrder';
import OrderButton from '../components/Button';
import Message from '../components/Error';

import { colors, fonts } from '../theme';
import { Subscription } from 'react-apollo';
import { ORDER_CREATE } from '../graphql/owner';

class OwnerOrder extends React.Component {
  // componentDidMount()
  render() {
    console.log({ffff: this.props.restaurantId})
    console.log({restaurantIddddd: this.props.restaurantId})
    return (
      <Subscription subscription={ORDER_CREATE} variables={{restaurantId: '0a794c25-7a84-4a9e-b93f-9f063276ccc2'}}>
        {({data, loading}) => {
          const {orders} = this.props;
          {/* this.props.pushOrders(data && data.onCreateOrders); */}
          return (
              <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                  hey
                </ScrollView>
              </View>
          )
        }}
      </Subscription>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomWidth: 0.3,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#cccccc'
  },
  scroll: {
    width: '100%',
    position:'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1
  },
  keyboardAvoidingView: {
    width: '100%',
    zIndex: 4,
    flex: 1,
    justifyContent: 'flex-end'
  }
})

const mapToProps = ({ restaurantId, ownerId, pushOrders, orders }) => ({ restaurantId, ownerId, pushOrders, orders })

export default connect(mapToProps, actions)(OwnerOrder);
