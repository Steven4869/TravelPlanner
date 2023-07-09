import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchProfilePage();
  }, []);

  const fetchProfilePage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('http://192.168.29.225:3000/api/auth/profile', config);
      const { username, email } = response.data.user;
      setusername(username);
      setEmail(email);
    } catch (error) {
      console.log('Failed to fetch profile data', error.response);
      if (error.response && error.response.status === 401) {
        Alert.alert('Unauthorized', 'Please log in again');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Failed to fetch profile data');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Failed to logout', error);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/app_profile.jpg')} style={styles.profileImage} />
      <Text style={styles.title}>Profile</Text>
      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.userInfo}>{username}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.userInfo}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#fff',
  },
  userInfo: {
    fontSize: 18,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#fca311',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
