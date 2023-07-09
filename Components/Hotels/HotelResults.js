import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HotelResultsScreen = ({ route }) => {
  const { hotelResults } = route.params;

  const renderHotelOffer = ({ item }) => {
    const { name, hotelId, address, distance } = item;

    return (
      <View style={styles.hotelOffer}>
        <Text style={styles.offerText}>Hotel Name: {name}</Text>
        <Text style={styles.offerText}>Hotel ID: {hotelId}</Text>
        <Text style={styles.offerText}>Country Code: {address.countryCode}</Text>
        <Text style={styles.offerText}>Distance: {distance.value} {distance.unit}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotel Offers</Text>
      <FlatList
        data={hotelResults}
        renderItem={renderHotelOffer}
        keyExtractor={(item) => item.hotelId}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    width: '80%',
  },
  hotelOffer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  offerText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default HotelResultsScreen;
