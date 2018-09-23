'use strict';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Mutation} from 'react-apollo';
import t from 'tcomb-form-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Form = t.form.Form;

// here we are: define your domain model
const Person = t.struct({
  // name: t.String,              // a required string
  // surname: t.maybe(t.String),  // an optional string
  // age: t.Number,               // a required number
  // rememberMe: t.Boolean        // a boolean
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
      waitTime: 33,
      speciality: '',
      image: ''
    }
  }

  onChange = (value) => {
    console.log('idfnapifneipfne', value)
    this.setState({value})
  }

  mutate  = (e, mutationFn) => {
    e.preventDefault();
    // let data = {...this.state.value};
    // data = edit === true ? {...data, restaurantId} : {...data};
    mutationFn({
      variables: {
        // ...data,
        ...this.state.value,
        ownerId: this.props.ownerId
      }
    })
    .then(data => alert())
    .catch(err => console.error(err))
  }
  render() {
    console.log('FORM STATE ------>', this.state)
    // console.log('FORM props ------>', this.props)
    const {type, options, color, value = this.state.value, mutation, text, alert, edit = false, restaurantId = null} = this.props;
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
