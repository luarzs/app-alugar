import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../components/Loading';
import { Favorite } from '../components/Favorite';

import New from '../components/New';
import House from '../components/House';
import Recommend from '../components/Recommend';
import Search from '../components/Search';

import { api } from '../services/api';

export default function Home() {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [houses, setHouses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [nextToUser, setNextToUser] = useState([]);
  const [withOffer, setWithOffer] = useState([]);
  const [newHouses, setNewHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      getNew(),
      getFavorites(),
      getNextToUser(),
      getWithOffer(),
    ]);
    setRefreshing(false);
  });

  const getNew = useCallback(async () => {
    const newHousesAPI = await api.getNew();
    setNewHouses(newHousesAPI);
  });

  const getFavorites = useCallback(async () => {
    const FavoritesHousesAPI = await api.getFavorites();
    setFavorites(FavoritesHousesAPI);
  });

  const getNextToUser = useCallback(async () => {
    const nextToUserAPI = await api.getNextToUser();
    setNextToUser(nextToUserAPI);
  });

  const getWithOffer = useCallback(async () => {
    const withOfferAPI = await api.getWithOffer();
    setWithOffer(withOfferAPI);
  });

  const getAll = useCallback(() => {
    const housesAPI = api.houses;
    setHouses(housesAPI);
  });

  const filter = useCallback(async (str) => {
    const filtered = await api.filter(str);

    setHouses(filtered);
  });


  useEffect(() => {
    getAll();
    async function load() {
      await Promise.all([
        getNew(),
        getFavorites(),
        getNextToUser(),
        getWithOffer(),
      ]);

      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    filter(search);
  }, [search]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#FFF', }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
    >
      <View style={styles.header}>
        <View style={styles.inputArea}>
          <Feather name="search" size={24} color="#000" />
          <TextInput
            placeholder="O que está procurando?"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {
        search.length === 0 ? (
          <>
            {favorites.length > 0 && (
              <View>
                <View style={styles.contentNew}>
                  <Text style={styles.title}>Favoritos</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
                  {
                    favorites.map(house => (
                      <Favorite
                        key={house.id}
                        cover={house.cover}
                        name={house.name}
                        price={house.price}
                        onPress={() => navigation.navigate('detail', { houseId: house.id })}
                      />
                    ))
                  }
                </ScrollView>
              </View>

            )}

            <View style={{ ...styles.contentNew, marginTop: 16 }}>
              <Text style={styles.title}>Novidades</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
              {
                newHouses.map(house => (
                  <New
                    key={house.id}
                    cover={house.cover}
                    name={house.name}
                    description={house.description}
                    price={house.price}
                    onPress={() => navigation.navigate('detail', { houseId: house.id })}
                  />
                ))
              }
            </ScrollView>

            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
              <Text style={[styles.title, { marginTop: 20 }]}>Próximo a você</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
              {
                nextToUser.map(house => (
                  <House
                    key={house.id}
                    cover={house.cover}
                    description={house.description}
                    price={house.price}
                    onPress={() => navigation.navigate('detail', { houseId: house.id })}
                  />
                ))
              }
            </ScrollView>

            <Text style={[styles.title, { marginTop: 20 }]}>
              Dica do dia
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
              {
                withOffer.map(house => (
                  <Recommend
                    key={house.id}
                    cover={house.cover}
                    house={house.name}
                    offer={house.offer}
                    onPress={() => navigation.navigate('detail', { houseId: house.id })}
                  />
                ))
              }
            </ScrollView>
          </>
        ) : (
          <View>
            {houses.length > 0 ? (
              <View style={{ paddingHorizontal: 20 }}>
                <Text>Resultados: {houses.length}</Text>
                {houses.map(house => (
                  <Search
                    key={house.id}
                    cover={house.cover}
                    name={house.name}
                    description={house.description}
                    price={house.price}
                    onPress={() => navigation.navigate('detail', { houseId: house.id })}
                  />
                ))}
              </View>
            ) : (
              <View style={{ padding: 16 }}>
                <Text style={{ color: "#000", fontSize: 24, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
                  Nenhum resultado encontrado
                </Text>
              </View>
            )}
          </View>
        )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
  },

  inputArea: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
    backgroundColor: '#FFF',
    elevation: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 16,
  },

  input: {
    fontFamily: 'Montserrat_500Medium',
    paddingHorizontal: 10,
    fontSize: 13,
    width: '90%'
  },

  contentNew: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },

  title: {
    paddingHorizontal: 15,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: '#4f4a4a'
  }
})