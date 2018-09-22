import React, { Component } from 'react';
import { connect } from 'redux-zero/react';


import actions from '../store/actions';
import Layout from './Layout';

const whoIs = {isUser: true, isOwner: false};
const signOn = (props, fn) => user => fn({user, ...props})
const mapToProps = ({ isAuthed, user, isUser, isOwner }) => ({ isAuthed, user, isUser, isOwner });
const Cliente = ({signOnOwner}) => (
  <Layout
    greeting="Bem-vindo"
    greeting2="conecte-se para continuar"
    whoIs={whoIs}
    imagePath={require('../assets/logo.png')}
    signOn={signOn({isAuthed: true, isOwner: false, isUser: true}, signOnOwner)}
  />
);
export default connect(mapToProps, actions)(Cliente);
