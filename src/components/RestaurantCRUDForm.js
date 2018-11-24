'use strict';

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'redux-zero/react';
import { Button, TextInput, Switch } from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import { Formik, ErrorMessage } from 'formik';
import SaveButton from './Button'
import {FormError} from './FormError'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Picker from 'react-native-picker-select';
import {colors} from '../theme';
import actions from '../store/actions'

const mapToProps = ({categoriesLabels}) => ({categoriesLabels})
export default connect(mapToProps, actions)(({ value, onSave, text, formStyle, categoriesLabels }) => (
  <Formik
    initialValues={{ ...value, items: categoriesLabels}}
    validate={values => validate(values)}
    onSubmit={values => onSave(values)}>
    {({ handleChange, handleSubmit, values, setFieldValue }) => (
      <KeyboardAwareScrollView>
        <View style={[styles.container, formStyle]}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              mode='disabled'
              label='Nome'
              value={values.name}
              onChangeText={handleChange('name')}
              name='name'
             />
            <FormError name="name"/>
            <TextInput
              style={styles.input}
              mode='disabled'
              label='Descriçao'
              value={values.description}
              onChangeText={handleChange('description')}
              name='description'
            />
            <FormError name='description'/>
            <TextInput
              style={styles.input}
              mode='disabled'
              label='Localizaçao'
              value={values.location}
              onChangeText={handleChange('location')}
              name='location'
            />
            <FormError name='location'/>
            <TextInput
              style={styles.input}
              mode='disabled'
              label='Tempo de Espera'
              value={values && values.waitTime ? values.waitTime.toString() : ''}
              keyboardType='numeric'
              onChangeText={handleChange('waitTime')}
              name='waitTime'
            />
            <FormError name='waitTime'/>
            <Picker
              placeholder={{
                label: 'Selecionar uma especialidade',
                value: null,
              }}
              hideIcon={true}
              items={values.items}
              onValueChange={value => setFieldValue('speciality', value)}
              style={{...pickerSelectStyles}}
              value={values.speciality}
            />

            {/* <TextInput
              style={styles.input}
              mode='disabled'
              label='Especialidade'
              value={values.speciality}
              onChangeText={handleChange('speciality')}
              name='speciality'
            /> */}
            <FormError name='speciality'/>
            <TextInput
              style={styles.input}
              mode='disabled'
              label='Tel'
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              keyboardType='numeric'
              name='phoneNumber'
            />
            <FormError name='phoneNumber'/>
            <TextInput
              style={styles.input}
              mode='disabled'
              label='Imagem'
              value={values.image}
              onChangeText={handleChange('image')}
              name='image'
            />
            <FormError name='image'/>
            <TextInput
              style={styles.input}
              mode='disabled'
              label='Abre as'
              value={values.scheduleStart}
              onChangeText={handleChange('scheduleStart')}
              name='scheduleStart'
            />
            <FormError name='scheduleStart'/>
            <TextInput
              style={styles.input}
              mode='disabled'
              label='Fecha as'
              value={values.scheduleEnd}
              onChangeText={handleChange('scheduleEnd')}
              name='scheduleEnd'
            />
            <FormError name='scheduleEnd'/>
            <Switch
              style={{margin: 10}}
              value={values.isWeekendOpen}
              onValueChange={value => setFieldValue('isWeekendOpen', value)}
            />
            <FormError name='isWeekendOpen'/>
          </View>
          <SaveButton
            onPress={handleSubmit}
            text={text}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </KeyboardAwareScrollView>
    )}
  </Formik>
));

const validate = values => {
  const errors = {};
  if (values.name === '') {
    errors.name = 'Este campo é obrigatorio';
  }
  if (values.description === '') {
    errors.description = 'Este campo é obrigatorio';
  }
  if (values.location === '') {
    errors.location = 'Este campo é obrigatorio';
  }
  if (values.waitTime === 0) {
    errors.waitTime = 'Este campo é obrigatorio';
  }
  if (values.speciality === '') {
    errors.speciality = 'Este campo é obrigatorio';
  }
  if (values.image === '') {
    errors.image = 'Este campo é obrigatorio';
  }
  if (values.scheduleStart === '') {
    errors.scheduleStart = 'Este campo é obrigatorio';
  }
  if (values.scheduleEnd === '') {
    errors.scheduleEnd = 'Este campo é obrigatorio';
  }
  return errors;
};

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
    backgroundColor: colors.green,
    marginLeft: 0,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    marginTop: 10
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  }
});
