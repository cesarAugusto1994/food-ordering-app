
'use strict';

import React from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Mutation, graphql} from 'react-apollo';
import t from 'tcomb-form-native';
import gql from 'graphql-tag';
import Form from './Form';
import {showMessage} from 'react-native-flash-message';
import Card from './Card'
import CardOverlay from './CardOverlay'

const FoodType = t.struct({
  name: t.String,
  description: t.String,
  price: t.Number,
  image: t.String,
});

export default class _Form extends React.Component {
  state = {
    value: {
      name: '',
      description: '',
      price: 0,
      image: '',
    }
  }

  onChange = (value) => {
    this.setState({value})
  }

  mutate  = (e, mutationFn, client) => {
    e.preventDefault();
    const {
      props: {
        restaurantId,
        foodId,
        mutationName,
        edit
      },
      state:{ value }
    } = this;
    const variables = {
      ...value,
      restaurantId,
      foodId
    };

    if(!this.props.edit) {
      if (
        value.name === '' ||
        value.description === '' ||
        value.price === '' ||
        value.image === 0 ||
        value.foodId === ''
        ) {
          return showMessage({
            type: 'warning',
            message: 'Os campos não devem estar vazios'
          });
      }
    }
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
      value = this.state.value,
      containerStyle,
      formStyle
    } = this.props;
    return (
      <Mutation mutation={mutation}>
        {(mutationFn, {client, data, error, loading}) => (
          <View style={[styles.container, containerStyle]}>
            <CardOverlay source={value.image !== '' ? {uri: value.image} : require('../assets/placeholder.png')}/>
            <Form
              type={FoodType}
              options={options}
              onChange={this.onChange}
              formStyle={[formStyle, styles.formStyle]}
              value={value}
              text={text}
              onSave={async e => await this.mutate(e, mutationFn, client)}
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
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
  },
  formStyle: {
    marginTop: 5
  }
});
