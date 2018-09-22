import {StyleSheet} from 'react-native';
import { fonts, colors } from '../theme'

const userStyle = StyleSheet.create({
    modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    },
    heading: {
      flexDirection: 'row'
    },
    headingImage: {
      width: 38,
      height: 38
    },
    inputContainer: {
      marginTop: 20
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 40
    },
    greeting: {
      marginTop: 20,
      fontSize: 24,
      // fontFamily: fonts.light
    },
    greeting2: {
      color: '#666',
      fontSize: 24,
      marginTop: 5,
      // fontFamily: fonts.light
    },
    button: {
      width: 28,
      height: 28,
      margin: 5
    },
    social: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      padding: 10,
      borderRadius: 10,
    },
    socialText: {
      color: 'white',
      // fontFamily: fonts.base
    }
  });
  const ownerStyle = StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputContainer: {
      marginTop: 20
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 40
    },
    greeting: {
      marginTop: 20,
      // fontFamily: fonts.light,
      fontSize: 24
    },
    greeting2: {
      // fontFamily: fonts.light,
      color: '#666',
      fontSize: 24,
      marginTop: 5
    },
    heading: {
      flexDirection: 'row'
    },
    headingImage: {
      width: 38,
      height: 38
    },
    errorMessage: {
      fontFamily: fonts.base,
      fontSize: 12,
      marginTop: 10,
      color: 'transparent'
    }
});

const styles = {
  user: userStyle,
  owner: ownerStyle
};

export default styles;
