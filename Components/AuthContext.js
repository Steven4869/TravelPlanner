import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // User is logged in
          setUser(token);
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (token) => {
    try {
      // Save the token in storage
      await AsyncStorage.setItem('token', token);
      setUser(token);
    } catch (error) {
      console.log('Error saving token:', error);
    }
  };

  const logout = async () => {
    try {
      // Remove the token from storage
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.log('Error removing token:', error);
    }
  };

  if (isLoading) {
    // Show a loading screen while checking the login status
    return <LoadingScreen />
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
