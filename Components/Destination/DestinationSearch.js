import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import getAccessToken from '../AccessToken';
import { Picker } from '@react-native-picker/picker';


const PointOfInterestSearch = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [category, setCategory] = useState('SIGHTS'); // Default category is 'SIGHTS'
  const [loading, setLoading] = useState(false); // Loading state

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

  const handleSearch = async () => {
    try {
      setLoading(true); // Start loading

      // Retrieve latitude and longitude using MapQuest API
      const geocodingResponse = await axios.get(
        `http://www.mapquestapi.com/geocoding/v1/address?key=El6xMMwc3lzJMtWjFPck3aiTsEkWsXLX&location=${location}`
      );

      const results = geocodingResponse.data.results;
      if (results && results.length > 0) {
        const { lat, lng } = results[0].locations[0].latLng;
        console.log(lat, lng);
        setLatitude(lat);
        setLongitude(lng);

        // Search for points of interest using Amadeus API
        const poiResponse = await axios.get(
          `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${lat}&longitude=${lng}&radius=20&categories=${category}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const poiResults = poiResponse.data.data;
        console.log(poiResults);

        navigation.navigate('DestinationResults', { poiResults });
      } else {
        Alert.alert('Location Not Found', 'Unable to find the specified location. Please try again.');
      }
    } catch (error) {
      console.log('Error occurred while performing POI search:', error);
      Alert.alert('Error', 'An error occurred while fetching points of interest. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Point of Interest Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <Text style={styles.label}>Category:</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            style={styles.dropdown}
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            itemStyle={styles.dropdownItem} // Added itemStyle for dropdown items
          >
            <Picker.Item label="SIGHTS" value="SIGHTS" />
            <Picker.Item label="RESTAURANT" value="RESTAURANT" />
            <Picker.Item label="NIGHTLIFE" value="NIGHTLIFE" />
            <Picker.Item label="SHOPPING" value="SHOPPING" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Search</Text>
          )}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 16,
  },
  dropdown: {
    height: 40,
    paddingHorizontal: 8,
    color: 'black', // Added color for dropdown text
  },
  dropdownItem: {
    fontSize: 16, // Adjust font size of dropdown items
  },
  searchButton: {
    backgroundColor: '#fca311',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PointOfInterestSearch;
