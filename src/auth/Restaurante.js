import React, { Component } from 'react';
import { connect } from 'redux-zero/react';


import actions from '../store/actions';
import Layout from './Layout';
import {CREATE_OWNER, GET_OWNER} from '../graphql/owner';

const whoIs = {isUser: false, isOwner: true};
const signOn = (props, fn) => user => fn({user, ...props});
const mapToProps = ({ signOnUser }) => ({ signOnUser });
const mutationName = 'createOwner';
const mutationModel = 'Owner';
const queryName = 'listOwners';

const Owner = ({signOnUser, navigation}) => (
  <Layout
    greeting="Bem-vindo 2"
    greeting2="conecte-se para continuar 2"
    imagePath={require('../assets/shape.png')}
    whoIs={whoIs}
    query={GET_OWNER}
    queryName={queryName}
    mutation={CREATE_OWNER}
    mutationName={mutationName}
    mutationModel={mutationModel}
    navigation={navigation}
    signOn={signOn({isAuthed: true, isOwner: true, isUser: false}, signOnUser)}
  />
);

export default connect(mapToProps, actions)(Owner);
