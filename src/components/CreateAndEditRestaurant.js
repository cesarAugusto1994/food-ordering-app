'use strict';

import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import {Mutation, graphql} from 'react-apollo';
import t from 'tcomb-form-native';
import gql from 'graphql-tag';
import Form from './RestaurantCRUDForm';
import CardOverlay from './CardOverlay';
import {showMessage} from 'react-native-flash-message';
import {DELETE_RESTAURANTE} from '../graphql/owner/index'

const RestauranteType = t.struct({
  name: t.String,
  description: t.String,
  location: t.String,
  waitTime: t.Number,
  speciality: t.String,
  phoneNumber: t.String,
  image: t.String,
  scheduleStart: t.String,
  scheduleEnd: t.String,
  isWeekendOpen: t.Boolean
});

export default class _Form extends React.Component {
  mutate = (mutationFn, client,  values) => {
    const {
      props: {
        restaurantId,
        ownerId,
        phoneNumber,
        mutationName,
        edit
      }
    } = this;
    const variables = {
      ...values,
      restaurantId,
      waitTime: values.waitTime ? Number(values.waitTime): '',
      phoneNumber: values.phoneNumber,
      ownerId
    };
    mutationFn({
      variables,
      optimisticResponse: () => ({
        [mutationName]: { ...variables, __typename: 'Restaurant' },
        __typename: 'Mutation'
      }, {}),
    })
    .then(data => {
      console.log({ddddd: data})
      if(edit && !_.isEmpty(data.data.updateRestaurant) || !_.isEmpty(data.data.createRestaurant)) {
        client.resetStore();
        showMessage({type: 'success', message: 'Item guardado com sucesso!'});
        return this.props.goBack()
      }
      return showMessage({
        type: 'danger',
        message: 'Ocorreu-se algum errro',
        description: 'Deve-se à um problema técnico com os nossos servidores',
        backgroundColor: "red"
      })
    })
    .catch(err => console.log({err}) || showMessage({
      type: 'danger',
      message: 'Ocorreu-se algum errro',
      description: 'Deve-se à um ou mais problemas com os dados do restaurante',
      backgroundColor: "red"
    }));
  }

  deleteRestaurant = (client, restaurantId) => {
    const message = 'Tem a certeza que pretende apagar este restaurante?';
    Alert.alert(
      'Apagar restaurante',
      message,
      [
        {text: 'Nao', onPress: () => {}},
        {text: 'Sim', onPress: () => this.restaurantDeletion(client, restaurantId)},
      ],
      { cancelable: false }
    )
  }
  restaurantDeletion = (client, restaurantId) => {
    client.mutate({mutation: DELETE_RESTAURANTE, variables: {restaurantId}})
    .then(({data}) => {
      client.resetStore();
      showMessage({type: 'success', message: 'Apagado com sucesso'})
      return this.props.goBack()
    })
    .catch(err => showMessage({
      type: 'danger',
      message: 'Houve um erro ao tentar apagar este restaurante',
      backgroundColor: 'red'
    }))
  }
  render() {
    const {
      mutation,
      text,
      value,
      edit,
      containerStyle,
      formStyle,
      children = () => null
    } = this.props;
    console.log({state: this.state})
    return (
      <Mutation mutation={mutation}>
        {(mutationFn, {client, data, error, loading}) => (
          <View style={[styles.container, containerStyle]}>
            <CardOverlay
              source={value && value.image !== '' ? {uri: value.image} : require('../assets/placeholder.png')}
              disabled={true}
              />
            {children(this.deleteRestaurant.bind(this, client, this.props.restaurantId))}
            <Form
              onChange={this.onChange}
              formStyle={formStyle}
              value={value}
              text={text}
              isEditing={edit}
              onSave={values => this.mutate(mutationFn, client, values)}
            />
          </View>
        )}
      </Mutation>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#fff',
  }
});
