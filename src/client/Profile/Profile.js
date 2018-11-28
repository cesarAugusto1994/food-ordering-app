import React from 'react';
import {View,Text,StyleSheet,ScrollView,AsyncStorage} from 'react-native';
import { Query } from "react-apollo";
import gql from 'graphql-tag';

import { Header, SearchBar, Avatar, List, ListItem, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'redux-zero/react';
import actions from '../../store/actions';

import { colors, fonts } from '../../theme';
import LogoutButton from '../../components/Button';

const GET_LOCAL_USER = gql`{
  user @client {
    image
    firstName
    lastName
    email
  }
}`;


const Profile = (props) => {
  const user = props.user
  return (
    // <Query query={GET_LOCAL_USER}>
    //   {({ data }) => console.log({data}) || (
        <View style={styles.container}>
          <View style={styles.info}>
            <Avatar
              xlarge
              rounded
              source={{uri: user && user ? user.image  : '' }}
              activeOpacity={0.7}
            />
          </View>

          <View style={styles.wrapper}>
            <View style={styles.el}>
              <Icon name='account-box-outline' size={25} color='#FB28' />
              <Text style={styles.keys}>{user && user ? user.firstName  : ''}</Text>
            </View>
            <View style={styles.el}>
              <Icon name='account-box-outline' size={25} color='#FB28' />
              <Text style={styles.keys}>{user && user ? user.lastName  : ''}</Text>
            </View>
            <View style={styles.el}>
              <Icon name='email' size={25} color='#FB28' />
              <Text style={styles.keys}>{user && user ? user.email  : ''}</Text>
            </View>
          </View>

          <LogoutButton
            onPress={
              async () => {
                await AsyncStorage.clear()
                props.signOut()
                props.navigation.navigate('Auth')
                }
            }
            buttonStyle={{backgroundColor: colors.red}}
            text="Terminar sessão"
          />
        </View>
  )
}

Profile.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  info: {
    padding: 10,
    marginTop: 50,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  text: {
    textAlign: 'left',
    fontWeight: "700"
  },
  keys: {
    textAlign: 'left',
    fontWeight: "500",
    // fontFamily: 'space-mono'
  },
  el: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    width: '80%',
    height: 60,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOpacity: 0.30,
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
  }
})

const mapToProps = ({ isAuthed, user, currentUser }) => ({ isAuthed, user, currentUser });
export default connect(mapToProps, actions)(Profile)
