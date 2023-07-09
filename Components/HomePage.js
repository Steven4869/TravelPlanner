import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({ navigation }) => {


  const handleDestinationSearch = () => {
    // Handle destination search logic
    navigation.navigate('DestinationSearch');
  };

  const handleFlightSearch = () => {
    // Handle flight search logic
    navigation.navigate('FlightSearch');
  };

  const handleAccommodationSearch = () => {
    // Handle accommodation search logic
    navigation.navigate('HotelSearch');
  };
  const handleProfile = () =>{
    navigation.navigate('Profile')
  }
  const handleItineraryCreate = () => {
    // Handle itinerary creation logic
    navigation.navigate('ItineraryCreate');
  };

  const handleLogout = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('token');
      // Navigate to the login page and replace the profile page in the stack
      navigation.replace('Login');
    } catch (error) {
      console.log('Failed to logout', error);
      // Handle error while logging out
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.icons}>
        <TouchableOpacity style={styles.icon} onPress={handleProfile}> 
            <Feather name="user" size={24} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.icon}>
            <Feather name="log-out" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Travel Planner</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDestinationSearch}>
          <Text style={styles.buttonText}>Destination Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFlightSearch}>
          <Text style={styles.buttonText}>Flight Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAccommodationSearch}>
          <Text style={styles.buttonText}>Accommodation Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleItineraryCreate}>
          <Text style={styles.buttonText}>Create Itinerary</Text>
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
    position: 'absolute',
    top: 24,
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: 16,
  },
  icon: {
    marginLeft: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    color: '#fff',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    width: '70%'
  },
  button: {
    width: '100%',
    backgroundColor: '#fca311',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
