import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import jjs from '../image/login.jpg';
import axios from 'axios';

const Register = ({navigation}) => {
  const [user, setUser] = useState({name: '', email: '', password: ''});
  const handlechange = (name, value) => {
    setUser({...user, [name]: value});
  };

  const registerhandle = async () => {
    try {
      await axios.post('http://192.168.18.52:3000/register', user);
      setUser(' ');
      Alert.alert('Check Register Email and Verify');
      navigation.navigate('login');
    } catch (error) {
      console.log(error);
    }
  };
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
          Register
        </Text>
        <KeyboardAvoidingView>
          <TextInput
            onChangeText={e => handlechange('name', e)}
            value={user}
            placeholder="Name"
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
            onChangeText={e => handlechange('email', e)}
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
            onChangeText={e => handlechange('password', e)}
            value={user}
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
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={registerhandle}
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
            Register
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate('login')}
          style={{
            textAlign: 'center',
            justifyContent: 'center',

            fontSize: 16,
            fontWeight: 'bold',
            margin: 20,
          }}>
          {' '}
          Already Register ? Login
        </Text>
      </View>
    </View>
  );
};

export default Register;
