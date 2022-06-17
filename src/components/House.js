import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function House(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View>
        <Image
          source={props.cover}
          style={styles.cover}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.description} numberOfLines={3}>
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
    width: 260,
    height: 70,
    backgroundColor: '#FFF',
    elevation: 2,
    padding: 6,
    marginVertical: 5,
    marginRight: 20,
    marginLeft: 2,
    borderRadius: 10,
  },

  cover: {
    width: 60,
    height: 60,
    borderRadius: 10
  },

  content: {
    width: '65%',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    height: '100%',
  },

  description: {
    fontSize: 9,
    fontFamily: 'Montserrat_500Medium',
    color: '#4f4a4a'
  },

  price: {
    fontSize: 12,
    fontFamily: 'Montserrat_700Bold'
  }
})