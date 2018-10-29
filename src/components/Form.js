'use strict';

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import {Mutation, graphql} from 'react-apollo';
import t from 'tcomb-form-native';
import gql from 'graphql-tag';
import SaveButton from './Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Form = t.form.Form;

export default ({ type, options, value, onSave, text, iconName, onChange, formStyle }) => (
  <KeyboardAwareScrollView>
    <View style={[styles.container, formStyle]}>
        <View style={styles.form}>
          <Form { ...{type, options, value, onChange}}/>
        </View>
        <SaveButton
          onPress={onSave} { ...{text, iconName}}
          buttonStyle={styles.buttonStyle}/>
      </View>
  </KeyboardAwareScrollView>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 5,
    backgroundColor: '#fff',
  },
  form: {
    justifyContent: 'center',
    width: '100%',
    padding: 5
  },
  buttonStyle: {
    marginLeft: 0
  }
});
