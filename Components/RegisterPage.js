import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    // Handle registration logic
    if (email.trim() === '' || password.trim() === '' || username.trim() === '') {
      Alert.alert('Error', 'Please enter the credentials.');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Check if email is valid using the regex
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post('http://192.168.29.225:3000/api/auth/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setIsRegistered(true);
      } else {
        console.log('Registration Failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', 'User Not Found');
      } else if (error.response && error.response.status === 500) {
        Alert.alert('Error', 'Failed to register user, please try with a different username');
      } else {
        console.log(error);
        Alert.alert('Error', 'An error occurred during registration. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginHere = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (isRegistered) {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    }
  }, [isRegistered, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoginHere}>
          <Text style={styles.loginHereText}>Already have an account? Login Here</Text>
        </TouchableOpacity>
        {isRegistered && <Text style={styles.successMessage}>User Registered Successfully!</Text>}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  registerButton: {
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
  loginHereText: {
    color: '#007bff',
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
  },
});

export default RegisterPage;
