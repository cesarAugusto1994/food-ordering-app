
'use strict';

import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import {Mutation, graphql} from 'react-apollo';
import t from 'tcomb-form-native';
import gql from 'graphql-tag';
import Form from './FoodCRUDForm';
import {showMessage} from 'react-native-flash-message';
import Card from './Card';
import CardOverlay from './CardOverlay';

export default class _Form extends React.Component {
  mutate  = (mutationFn, client, values) => {
    const {
      props: {
        restaurantId,
        foodId,
        ownerId,
        mutationName,
        edit
      }
    } = this;
    const variables = {
      ...values,
      restaurantId,
      foodId,
      ownerId
    };
    mutationFn({
      variables,
      optimisticResponse: () => ({
        [mutationName]: { ...variables, __typename: 'Food' },
        __typename: 'Mutation'
      }, {}),
    })
    .then(data => {
      client.resetStore();
      if(edit && !_.isEmpty(data.data.updateFood) || !_.isEmpty(data.data.createFood)) {
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
    .catch(err => showMessage({
      type: 'danger',
      message: 'Ocorreu-se algum errro',
      description: 'Deve-se à um ou mais problemas com os dados do item',
      backgroundColor: "red"
    }));
  }
  render() {
    const {
      options,
      mutation,
      text,
      value,
      containerStyle,
      formStyle
    } = this.props;
    return (
      <Mutation mutation={mutation}>
        {(mutationFn, {client, data, error, loading}) => (
          <View style={[styles.container, containerStyle]}>
            <CardOverlay
              source={value && value.image !== '' ? {uri: value.image} : require('../assets/placeholder.png')}
              disabled={true}
              />
            <ScrollView>
              <Form
                formStyle={[formStyle, styles.formStyle]}
                value={value}
                text={text}
                onSave={values => this.mutate(mutationFn, client, values)}
              />
            </ScrollView>
          </View>
        )}
      </Mutation>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
  },
  formStyle: {
    marginTop: 5
  }
});
