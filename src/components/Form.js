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

class _Form extends React.Component {
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
      state:{ value },
      getVariables
    } = this;

    const variables = getVariables({
      condition: edit === true,
      data: { ...value},
      restaurantId,
      ownerId
    });

    console.log({variables})
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

  getVariables = ({condition, data, restaurantId, ownerId}) => {
    if(condition) {
      return {
        ...data,
        restaurantId,
        ownerId
      };
    }
    return { ...data};
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
    console.log('post state', this.state)
    console.log('post ---->', this.props)
    return (
      <Mutation mutation={mutation}>
        {(mutationFn, {client, data, error, loading}) => console.log('----->do', {mutationFn, client}) || (
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
// const CREATE_RESTAURANTE = gql`
//   mutation {
//     createRestaurant(input: {
//       ownerId: "$ownerId",
//       name: "$name",
//       image: "$image",
//       description: "$description",
//       waitTime: 4,
//       speciality: "$speciality",
//       location: "$location",
//       restaurantId: "$restaurantId4"
//     }) {
//       image
//       restaurantId
//       location
//       waitTime
//       description
//       ownerId
//       speciality
//       name
//     }
//   }
// `;



export default _Form;
