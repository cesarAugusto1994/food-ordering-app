'use strict';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Mutation, graphql} from 'react-apollo';
import t from 'tcomb-form-native';
import gql from 'graphql-tag';

const Form = t.form.Form;

const Person = t.struct({
  name: t.String,
  description: t.String,
  location: t.String,
  waitTime: t.Number,
  speciality: t.String,
  image: t.String
});

export default class _Form extends React.Component {
  state = {
    value: {
      name: '',
      description: '',
      location: '',
      waitTime: 0,
      speciality: '',
      image: ''
    }
  }

  onChange = (value) => {
    this.setState({value})
  }

  mutate  = (e, mutationFn) => {
    e.preventDefault();
    const {
      props: {
        restaurantId,
        ownerId,
        mutationName,
        edit
      },
      state:{ value }
    } = this;
    const variables = {
      ...value,
      restaurantId,
      ownerId
    };

    mutationFn({
      variables,
      optimisticResponse: () => ({
        [mutationName]: { ...variables, __typename: 'Restaurant' },
        __typename: 'Mutation'
      }, {}),
    })
    .then(data => console.log('post', {data}))
    .catch(err => console.error({err}))
  }
  render() {
    const {
      type,
      options,
      color,
      value = this.state.value,
      mutation,
      text,
      alert,
    } = this.props;
    return (
      <Mutation mutation={mutation}>
        {(mutationFn, {client, data, error, loading}) => (
          <View style={styles.container}>
            {/* display */}
            <Form
              type={Person}
              options={options}
              onChange={this.onChange}
              value={value}
            />
            <TouchableOpacity
              style={[styles.button, {backgroundColor: color, borderColor: color}]}
              onPress={
                async e => await this.mutate(e, mutationFn)
              }
            >
              <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
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
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
