import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import jjs from '../image/login.jpg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [user, setUser] = useState({email: '', password: ''});

  const handleChange = (key, value) => {
    setUser({...user, [key]: value});
  };
  const handlelogin = async () => {
    try {
      const response = await axios.post(
        'http://192.168.18.52:3000/login',
        user,
      );
      const token = response.data.token;

      await AsyncStorage.setItem('auth', token);
      setUser(' ');
      navigation.navigate('Select');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchuser = async () => {
      const token = await AsyncStorage.getItem('auth');
      if (token) {
        navigation.navigate('BottomTab');
      }
    };
    fetchuser();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        resizeMode="cover"
        source={jjs}
        style={{
          flex: 1,
          height: '60%',
          width: '100%',
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            textAlign: 'center',
            margin: 50,
            fontWeight: '600',
            fontSize: 25,
          }}>
          {' '}
          Dating app
        </Text>
      </ImageBackground>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: '800',
            color: 'black',
          }}>
          Login
        </Text>
        <TextInput
          onChangeText={e => handleChange('email', e)}
          value={user}
          placeholder="Email"
          style={{
            margin: 12,
            alignItems: 'center',
            marginHorizontal: 30,
            borderWidth: 1,
            paddingHorizontal: 20,
            fontSize: 18,
            borderRadius: 10,
          }}
        />
        <TextInput
          onChangeText={e => handleChange('password', e)}
          value={user}
          id="password"
          name="password"
          placeholder="Password"
          style={{
            margin: 12,
            alignItems: 'center',
            marginHorizontal: 30,
            borderWidth: 1,
            paddingHorizontal: 20,
            fontSize: 18,
            borderRadius: 10,
          }}
        />
        <TouchableOpacity
          onPress={handlelogin}
          style={{
            alignSelf: 'center',
            height: 45,
            width: '60%',
            backgroundColor: 'blue',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',

              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate('register')}
          style={{
            textAlign: 'center',
            justifyContent: 'center',

            fontSize: 16,
            fontWeight: 'bold',
            margin: 20,
          }}>
          {' '}
          Are Visit First Time ? Register
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
