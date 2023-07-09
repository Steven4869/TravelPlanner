import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './Components/LandingPage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import HomePage from './Components/HomePage';
import CreateItinerary from './Components/Itinerary/CreateItinerary';
import FlightSearchScreen from './Components/Flight/FlightSearch';
import FlightResultsScreen from './Components/Flight/FlightResults';
import HotelSearch from './Components/Hotels/HotelSearch';
import HotelResultsScreen from './Components/Hotels/HotelResults';
import PointOfInterestSearch from './Components/Destination/DestinationSearch';
import PointOfInterestResults from './Components/Destination/DestinationResults';
import ProfilePage from './Components/ProfilePage';

const Stack = createStackNavigator();

const App = () => {

  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="FlightSearch" component={FlightSearchScreen} />
          <Stack.Screen name="FlightResults" component={FlightResultsScreen} />
          <Stack.Screen name="HotelSearch" component={HotelSearch} />
          <Stack.Screen name="HotelResults" component={HotelResultsScreen} />
          <Stack.Screen name="ItineraryCreate" component={CreateItinerary} />
          <Stack.Screen name="DestinationSearch" component={PointOfInterestSearch} />
          <Stack.Screen name="DestinationResults" component={PointOfInterestResults} />
          <Stack.Screen name="Profile" component={ProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
