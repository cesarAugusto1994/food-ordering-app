import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Platform, KeyboardAvoidingView }  from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native';
import _ from 'lodash';
import OrderItem from './OrderItem';
import Button from './Button';

const Form = t.form.Form;

const formStylesheet = _.cloneDeep(t.form.Form.stylesheet);
formStylesheet.textbox.normal.height = 100;

const OrderInfo = t.struct({
  additionalInfo: t.String,
  phoneNumber: t.Number
});

const options = {
  fields: {
    additionalInfo: {
      multiline: true,
      label: 'Pedido Especial',
      stylesheet: formStylesheet
    },
    phoneNumber: {
      label: 'Numero de telemovel',
    }
  }
};

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
export default ({ onOrder, amount = 0, value, onChange }) => (
  <View style={styles.container}>
      <View>
        <Form type={OrderInfo} options={options} value={value} onChange={onChange}/>
      </View>
    <View style={{padding: 0, margin: 0}}>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.total}>Total</Text>
        </View>
        <View>
          <Text style={styles.amount}>AOA {amount}</Text>
        </View>
      </View>
      <Button
        onPress={onOrder}
        iconName='shopping-cart'
        text=" Encomendar"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 0,
    padding: 20,
    backgroundColor: '#ffffff',
    width: '100%',
    flex: 1
  },
  info: {
    paddingTop: 0,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  infoContainer: {
    borderTopWidth: 0.3,
    padding: 10,
    borderColor: '#cccccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0c0e11',
    textAlign: 'left'
  },
  amount: {
    fontSize: 18,
    fontWeight: '300',
    color: '#0c0e11'
  }
});

