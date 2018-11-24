
'use strict';

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import {colors} from '../theme';


export const FormError = ({name}) => (
  <ErrorMessage
    render={message => (<Text style={style.text}>{message}</Text>)}
    name={name}
  />
)

const style = StyleSheet.create({
  text: {
    color: colors.red
  }
});
