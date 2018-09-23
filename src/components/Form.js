'use strict';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Mutation} from 'react-apollo';
import t from 'tcomb-form-native';
import { graphql } from 'react-apollo';
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
    let data = {...this.state.value};
    data = this.props.edit === true ? {...data, restaurantId: this.props.restaurantId} : {...data};
    mutationFn({
      variables: {
        ...data,
        ownerId: this.props.ownerId
      }
    })
    .then(data => alert())
    .catch(err => console.error(err))
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
        {(mutationFn, {data}) => (
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
