import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Search(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View>
        <Image
          source={props.cover}
          style={styles.cover}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {props.name}
        </Text>
        <Text style={styles.description}>
          {props.description}
        </Text>
        <Text style={styles.price}>
          {props.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 90,
    backgroundColor: '#FFF',
    elevation: 2,
    padding: 6,
    marginVertical: 8,
    borderRadius: 10,
  },

  cover: {
    width: 60,
    height: 60,
    borderRadius: 10
  },

  content: {
    width: '65%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: '100%',
  },

  title: {
    fontSize: 14,
    fontFamily: 'Montserrat_700Bold',
    color: '#333'
  },

  description: {
    fontSize: 9,
    fontFamily: 'Montserrat_500Medium',
    marginVertical: 4,
    color: '#4f4a4a'
  },
  
  price: {
    fontSize: 12,
    fontFamily: 'Montserrat_700Bold',
    color: '#4f4a4a'
  }
})