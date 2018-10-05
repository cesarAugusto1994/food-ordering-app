import React, { Component } from 'react';
import { connect } from 'redux-zero/react';


import actions from '../store/actions';
import Layout from './Layout';
import {CREATE_CLIENT, GET_CLIENT} from '../graphql/client';

const whoIs = {isUser: true, isOwner: false};
const signOn = (props, fn) => user => fn({user, ...props})
const mapToProps = ({ signOnUser }) => ({ signOnUser });
const mutationName = 'createClient';
const mutationModel = 'Client';
const queryName = 'listClients';

const Cliente = ({signOnUser, navigation}) => (
  <Layout
    greeting="Bem-vindo"
    greeting2="conecte-se para continuar"
    whoIs={whoIs}
    query={GET_CLIENT}
    queryName={queryName}
    mutation={CREATE_CLIENT}
    mutationName={mutationName}
    mutationModel={mutationModel}
    navigation={navigation}
    imagePath={require('../assets/logo.png')}
    signOn={signOn({isAuthed: true, isOwner: false, isUser: true}, signOnUser)}
  />
);

export default connect(mapToProps, actions)(Cliente);
