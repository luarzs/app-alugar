import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Favorite(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Image
        source={props.cover}
        style={styles.cover}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{props.name}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}> {props.price} </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#FFF',
    width: 200,
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    marginRight: 30,
    marginLeft: 2,
    marginBottom: 5,
  },

  cover: {
    width: 170,
    height: 110,
    borderRadius: 10
  },

  content: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
    color: '#4f4a4a'
  },

  footer: {
    justifyContent: 'center',
    width: '100%',
  },
  
  price: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
    color: '#5f5c5c'
  }
})