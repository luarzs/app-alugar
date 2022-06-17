import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Stars from 'react-native-stars';
import SwiperComponent from '../components/Swiper';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

export default function Detail({ route }) {
  const { houseId } = route.params;
  const [house, setHouse] = useState();
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState();

  const getHouse = useCallback(async () => {
    const houseAPI = await api.getHouse(houseId);
    setHouse(houseAPI);
    setFavorite(houseAPI.isFavorite);
  });

  const handleFavorite = useCallback(async () => {
    await api.toggleFavorite(house.id);
    setFavorite(!favorite);
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      await getHouse();
      setLoading(false);
    };
    load();
  }, [house]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.swiperContent}>
        <SwiperComponent images={house.images} />
        <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
          {favorite ? (
            <FontAwesome name="heart" size={24} color="#eb4034" />
          ) : (
            <FontAwesome name="heart-o" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.headerContent}>
        <View style={{ width: '65%' }}>
          <Text style={styles.house}>{house.name}</Text>
        </View>
        <View style={{ width: '35%' }}>
          <Text style={styles.rating}>Avaliações</Text>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Stars
              default={4}
              count={5}
              half={true}
              starSize={20}
              fullStar={<Ionicons name="md-star" size={24} style={styles.myStarStyle} />}
              emptyStar={<Ionicons name="md-star-outline" size={24} style={styles.myStarStyle} />}
              halfStar={<Ionicons name="md-star-half" size={24} style={styles.myStarStyle} />}
            />
          </View>
        </View>
      </View>
      <Text style={styles.price}>
        {house.price}
      </Text>
      <Text style={styles.description}>
        {house.description}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 15, marginTop: 35 }}>
        {house.images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image
              source={image}
              style={{ width: 90, height: 90, borderRadius: 8 }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  swiperContent: {
    flexDirection: 'row',
    height: 340,
    width: '100%',
    position: 'relative',
  },

  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff3',
    padding: 8,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContent: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },

  house: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: '#4f4a4a'
  },

  rating: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 9,
    color: '#4f4a4a'
  },

  myStarStyle: {
    color: '#E7A74e',
    backgroundColor: 'transparent',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  price: {
    paddingHorizontal: 20,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
    color: '#000'
  },

  description: {
    fontFamily: 'Montserrat_500Medium',
    paddingHorizontal: 20,
    color: '#b3aeae',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 20,
  },
  
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 20,
  }
});