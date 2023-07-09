import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingPage = ({ navigation }) => {
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateYAnim, {
          toValue: -10,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleGetStarted = async () => {
    try {
      // Check if the user is already logged in by retrieving the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (token) {
        // If the token exists, navigate to the profile page
        navigation.replace('Home');
      } else {
        // Otherwise, navigate to the login page
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Failed to get token', error);
      // Handle error while getting the token
      Alert.alert('Error', 'Failed to get token');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to the Travel Planner!</Text>
        <Text style={styles.description}>Plan your dream vacation with ease.</Text>
        <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: translateYAnim }] }]}>
          <TouchableOpacity onPress={handleGetStarted} style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 32,
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 32,
  },
  button: {
    backgroundColor: '#fca311',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingPage;
