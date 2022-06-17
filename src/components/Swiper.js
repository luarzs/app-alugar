import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper/src';

export default function SwiperComponent(props) {
  return (
    <Swiper
      style={styles.wrapper}
      dotStyle={{
        backgroundColor: '#000',
        borderColor: '#000',
        borderWidth: 1,
        width: 8,
        height: 8,
        borderRadius: 8,
      }}
      activeDotColor="#ddd"
      activeDotStyle={{
        borderColor: '#000',
        borderWidth: 1,
        width: 8,
        height: 8,
        borderRadius: 8,
      }}
    >

      {props.images.map((image, index) => (
        <View style={styles.slide} key={index}>
          <Image
            source={image}
            style={{ width: '100%', height: 400 }}
          />
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})