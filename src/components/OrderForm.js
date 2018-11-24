'use strict';

import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import {TextInput} from 'react-native-paper';
import { Formik, ErrorMessage } from 'formik';
import Button from './Button';
import {FormError} from './FormError'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../theme';

export default ({ onOrder, amount = 0, value }) => (
  <Formik
    initialValues={value}
    validate={values => validate(values)}
    onSubmit={values => onOrder(values)}>
    {({ handleChange, handleSubmit, values, setFieldValue }) => (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            mode='disabled'
            label='Pedido'
            value={values.additionalInfo}
            onChangeText={handleChange('additionalInfo')}
            multiline={true}
            name='additionalInfo'
          />
          <FormError name="additionalInfo"/>
          <TextInput
            style={styles.input}
            mode='disabled'
            label='Tel'
            value={values && values.userPhoneNumber ? values.userPhoneNumber.toString() : ''}
            keyboardType='numeric'
            onChangeText={handleChange('userPhoneNumber')}
            name='userPhoneNumber'
          />
          <FormError name='userPhoneNumber'/>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text style={styles.total}>Total</Text>
            </View>
            <View>
              <Text style={styles.amount}>AOA {amount}</Text>
            </View>
          </View>
          <Button
            onPress={handleSubmit}
            iconName='send'
            buttonStyle={{backgroundColor: colors.green}}
            text=" Enviar encomenda"
          />
        </View>
      </KeyboardAwareScrollView>
    )}
  </Formik>
);

const validate = values => {
  const errors = {};
  if (values.additionalInfo === '') {
    errors.additionalInfo = 'Este campo é obrigatorio';
  }
  if (values.userPhoneNumber === 0 || values.userPhoneNumber === '') {
    errors.userPhoneNumber = 'Este campo é obrigatorio';
  }
  return errors;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    width: '100%',
  },
  info: {
    paddingTop: 0,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  infoContainer: {
    borderTopWidth: 0.3,
    padding: 10,
    borderColor: '#cccccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0c0e11',
    textAlign: 'left'
  },
  amount: {
    fontSize: 18,
    fontWeight: '300',
    color: '#0c0e11'
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    marginTop: 10
  }
});


// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//     padding: 5,
//     backgroundColor: '#fff',
//   },
//   form: {
//     justifyContent: 'center',
//     width: '100%',
//     padding: 5
//   },
//   buttonStyle: {
//     backgroundColor: colors.green,
//     marginLeft: 0,
//     marginTop: 10
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: colors.grey,
//     borderRadius: 5,
//     marginTop: 10
//   }
// });
