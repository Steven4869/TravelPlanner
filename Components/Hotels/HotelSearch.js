import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import getAccessToken from '../AccessToken';
import axios from 'axios';

const HotelSearch = ({ navigation }) => {
  const [destination, setDestination] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessToken();
        setAccessToken(token);
      } catch (error) {
        console.error('Error retrieving access token', error);
      }
    };

    fetchAccessToken();
  }, []);

  const handleSearch = async () => {
    try {
      const hotelDestinationsResponse = await axios.get(
        `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${destination}&radius=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const hotelResults = hotelDestinationsResponse.data.data;
      console.log(hotelResults);

      navigation.navigate('HotelResults', { hotelResults });
    } catch (error) {
      console.log('Error occurred while performing hotel search:', error);
      Alert.alert('Error', 'An error occurred while fetching hotel destinations. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hotels Search</Text>
        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a city or location"
          value={destination}
          onChangeText={setDestination}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#162447',
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#fca311',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HotelSearch;
