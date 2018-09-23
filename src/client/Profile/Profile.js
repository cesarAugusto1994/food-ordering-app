import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Query } from "react-apollo";
import gql from 'graphql-tag';

import { Header, SearchBar, Avatar, List, ListItem } from 'react-native-elements';
import { connect } from 'redux-zero/react';
import actions from '../../store/actions';

import { colors, fonts } from '../../theme';
import LogoutButton from '../../components/Button';

class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };

  renderComponent(type) {
    switch (type) {
      case 'Logout':
        return (
          <Text onPress={this.logout.bind(this)} style={styles.welcome}>Logout</Text>
        )
      default:
        return (
          <Text>Hey</Text>
        )

    }
  }
  render() {
    const user = this.props.user
    console.log('Profile props', this.props)
    const list = [
      {
        title: 'Definições',
        icon: 'settings'
      },
      {
        title: 'Pagamento',
        icon: 'payment'
      },
      {
        title: 'Ajuda',
        icon: 'help'
      },
      {
        title: 'Actualizações',
        icon: 'update'
      }
    ]
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Avatar
            xlarge
            rounded
            source={{uri: user && user ? user.image  : '' }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <Text style={styles.nameText}>{user.firstName} {user.lastName}</Text>
        </View>
        <ScrollView>
          <List>
            {
              list.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  onPress={() => this.renderComponent(item.title)}
                  leftIcon={{name: item.icon}}
                />
              ))
            }
          </List>
        </ScrollView>
        <LogoutButton
          onPress={
            async () => {
              await AsyncStorage.clear()
              this.props.signOut()
              this.props.navigation.navigate('Auth')
              }
          }
          iconName='sign-out'
          text="Terminar sessão"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 0.3,
    borderColor: '#cccccc',
    backgroundColor: '#f7fbff'
  },
  info: {
    padding: 10,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderColor: '#cccccc',
    alignItems: 'center',
    backgroundColor: '#f7fbff'
  },
  nameText: {
    fontSize: 30,
    padding: 10
  },
  textLogout: {
    color: '#fff'
  },
  image: {
    padding: 5,
    paddingLeft: 3,
    height: 70,
    width: 80,
    borderRadius: 10,
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 5,
    tintColor: '#fff'
  },
  logout: {
    margin: 0,
    marginLeft: 40,
    marginBottom: 5,
    color: '#fff',
    backgroundColor: colors.primary,
    width: '80%'
  }
})

const mapToProps = ({ isAuthed, user, currentUser }) => ({ isAuthed, user, currentUser });
export default connect(mapToProps, actions)(Profile)
