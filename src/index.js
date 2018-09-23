import React from 'react';
import { StatusBar, AsyncStorage, Text, View } from 'react-native';

import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'redux-zero/react';
import actions from './store/actions';

// import Tabs from './auth/Tabs';
import AppNavigator from './nav';


// const ConditionalRenderer = ({isAuthed, isUser, isOwner}) => {
//   console.log('Conditional Renderer --->', {isAuthed, isOwner, isUser})
//   if (isAuthed && isUser === true) {
//     return (
//       <ClienteNav />
//     );
//   }
//   if (isAuthed && isOwner === true) {
//     return (
//       <View>
//         <Text>Is Owner</Text>
//       </View>
//     );
//   }
//   return (
//     <Tabs />
//   );
// };

class App extends React.Component {
  state = {
    isLoading: false,
    isAuthed: false,
    isUser: false,
    isOwner: false
  }
  componentDidMount() {

  }
  render() {
    const {isLoading, isAuthed, isOwner, isUser} = this.props.store.getState();
    console.log('Store State --->', this.props.store.getState())
    console.log('App State ----->', this.state)
    return (
        <React.Fragment>
          <AppNavigator />
        </React.Fragment>
    )
  }
};

// {
//   isLoading
//   ? <Text>App is Loading</Text>
//   : ConditionalRenderer({isAuthed, isOwner, isUser, isLoading})
// }

const mapToProps = ({ isAuthed, user, currentUser, isOwner, isUser }) => ({ isAuthed, user, currentUser, isOwner, isUser });
export default connect(mapToProps, actions)(App);
