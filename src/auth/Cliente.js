import React, { Component } from 'react';
import { connect } from 'redux-zero/react';


import actions from '../store/actions';
import Layout from './Layout';
import {CREATE_CLIENT, GET_CLIENT} from '../graphql/client';

const whoIs = {isUser: true, isOwner: false};
const mutationName = 'createClient';
const mutationModel = 'Client';
const queryName = 'clients';

const Cliente = ({navigation}) => (
  <Layout
    greeting="Bem-vindo ao espaço cliente"
    greeting2="conecte-se para continuar"
    whoIs={whoIs}
    query={GET_CLIENT}
    queryName={queryName}
    mutation={CREATE_CLIENT}
    mutationName={mutationName}
    mutationModel={mutationModel}
    navigation={navigation}
    imagePath={require('../assets/logo.png')}
  />
);

export default Cliente;
