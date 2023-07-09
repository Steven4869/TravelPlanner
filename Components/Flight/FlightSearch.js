import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import axios from 'axios';
import getAccessToken from '../AccessToken';

const FlightSearchScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessToken();
        console.log(token);
        setAccessToken(token);
      } catch (error) {
        console.error('Error retrieving access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  const searchAirportByCity = async (city) => {
    try {
      const response = await axios.get(
        `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${city}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const airports = response.data.data;
      if (airports.length > 0) {
        return airports[0].iataCode; // Return the first matching airport's IATA code
      } else {
        throw new Error('No matching airport found');
      }
    } catch (error) {
      console.log('Error occurred while searching for airports:', error);
      throw error;
    }
  };

  const handleSearch = async () => {
    try {
      const originIataCode = await searchAirportByCity(origin);
      const destinationIataCode = await searchAirportByCity(destination);

      const flightDestinationsResponse = await axios.get(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originIataCode}&destinationLocationCode=${destinationIataCode}&departureDate=${departureDate}&adults=${passengers}&max=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const flightResults = flightDestinationsResponse.data.data;
      console.log(flightResults);

      navigation.navigate('FlightResults', { flightOffers: flightResults });

    } catch (error) {
      console.log('Error occurred while performing flight destinations search:', error);
      Alert.alert('Error', 'An error occurred while fetching flight destinations. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Flight Search</Text>
        <Text style={styles.label}>Origin City</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter origin city"
          value={origin}
          onChangeText={setOrigin}
        />
        <Text style={styles.label}>Destination City</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter destination city"
          value={destination}
          onChangeText={setDestination}
        />
        <Text style={styles.label}>Departure Date (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter departure date"
          value={departureDate}
          onChangeText={setDepartureDate}
        />
        <Text style={styles.label}>Number of Passengers</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the number of passengers"
          value={passengers}
          onChangeText={setPassengers}
          keyboardType='numeric'
          defaultValue='1'
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

export default FlightSearchScreen;
