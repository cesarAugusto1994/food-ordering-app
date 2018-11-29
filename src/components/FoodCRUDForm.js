/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SaveButton from './Button';
import { FormError } from './FormError';
import { colors } from '../theme';

export default ({ value, onSave, text, formStyle }) => (
  <Formik
    initialValues={value}
    validate={values => validate(values)}
    onSubmit={values => onSave(values)}
  >
    {({ handleChange, handleSubmit, values, setFieldValue }) => (
      <KeyboardAwareScrollView>
        <View style={[styles.container, formStyle]}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              mode="disabled"
              label="Nome"
              value={values.name}
              onChangeText={handleChange('name')}
              name="name"
            />
            <FormError name="name" />
            <TextInput
              style={styles.input}
              mode="disabled"
              label="Descriçao"
              value={values.description}
              onChangeText={handleChange('description')}
              name="description"
            />
            <FormError name="description" />
            <TextInput
              style={styles.input}
              mode="disabled"
              label="Preço"
              value={values && values.price ? values.price.toString() : ''}
              keyboardType="numeric"
              onChangeText={handleChange('price')}
              name="price"
            />
            <FormError name="price" />
            <TextInput
              style={styles.input}
              mode="disabled"
              label="Imagem"
              value={values.image}
              onChangeText={handleChange('image')}
              name="image"
            />
            <FormError name="image" />
          </View>
          <SaveButton onPress={handleSubmit} text={text} buttonStyle={styles.buttonStyle} />
        </View>
      </KeyboardAwareScrollView>
    )}
  </Formik>
);

const validate = values => {
  const errors = {};
  if (values.name === '') {
    errors.name = 'Este campo é obrigatorio';
  }
  if (values.description === '') {
    errors.description = 'Este campo é obrigatorio';
  }
  if (values.price === 0) {
    errors.price = 'Este campo é obrigatorio';
  }
  if (values.image === '') {
    errors.image = 'Este campo é obrigatorio';
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
    padding: 5,
  },
  buttonStyle: {
    backgroundColor: colors.green,
    marginLeft: 0,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    marginTop: 10,
  },
});
