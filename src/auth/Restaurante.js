import React, { Component } from 'react';
import Layout from './Layout';
import { CREATE_OWNER, GET_OWNER } from '../graphql/owner';

const whoIs = { isUser: false, isOwner: true };
const mutationName = 'createOwner';
const mutationModel = 'Owner';
const queryName = 'owners';

const Owner = ({ navigation }) => (
  <Layout
    greeting="Bem-vindo ao espaço restaurante"
    greeting2="conecte-se para continuar"
    // eslint-disable-next-line global-require
    imagePath={require('../assets/shape.png')}
    whoIs={whoIs}
    query={GET_OWNER}
    queryName={queryName}
    mutation={CREATE_OWNER}
    mutationName={mutationName}
    mutationModel={mutationModel}
    navigation={navigation}
  />
);

export default Owner;
