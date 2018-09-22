import React, { Component } from 'react';
import { connect } from 'redux-zero/react';


import actions from '../store/actions';
import Layout from './Layout';

const whoIs = {isUser: false, isOwner: true};
const signOn = (props, fn) => user => fn({user, ...props})
const mapToProps = ({ isAuthed, user, isUser, isOwner }) => ({ isAuthed, user, isUser, isOwner });
const Owner = ({signOnOwner}) => (
  <Layout
    greeting="Bem-vindo 2"
    greeting2="conecte-se para continuar 2"
    imagePath={require('../assets/shape.png')}
    whoIs={whoIs}
    signOn={signOn({isAuthed: true, isOwner: true, isUser: false}, signOnOwner)}
  />
);

export default connect(mapToProps, actions)(Owner);
