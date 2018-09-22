import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {RkCard, rkCardImg, rkCardHeader, rkCardContent, rkCardFooter} from 'react-native-ui-kitten';

import { colors } from '../theme';

export default ({ onPress, index, description, name, image, waitTime}) => (
  <TouchableOpacity key={index}  onPress={onPress}>
    <RkCard style={styles.br}>
      <View rkCardHeader>
        <Text>{name}</Text>
      </View>
      <Image rkCardImg source={{uri: image}}/>
      <View rkCardContent>
        <Text>{description}</Text>
      </View>

      <View rkCardFooter>
        <Text>Tempo de espera: {waitTime.toString()} min</Text>
      </View>
    </RkCard>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  br: {
    marginTop: 20,
    marginBottom: 6,
  }
});
