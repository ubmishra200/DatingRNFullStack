import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'core-js/stable/atob';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import BottomTab from '../../BottomTab';

const Select = () => {
  const navigation = useNavigation();
  const [option, setoption] = useState();
  const [userId, setUserid] = useState();
  useEffect(() => {
    const fetchuser = async () => {
      const token = await AsyncStorage.getItem('auth');

      const {userId} = jwtDecode(token);
      setUserid(userId);
      console.log('userId', userId);
    };
    fetchuser();
  }, []);
  const udatedgender = async () => {
    try {
      const data = await axios.put(
        `http://192.168.18.52:3000/users/${userId}/gender`,
        {gender: option},
      );

      if (data.status == 200) {
        navigation.navigate('BottomTab');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 25, fontWeight: '900'}}>Choose Gender</Text>
      <TouchableOpacity
        onPress={() => setoption('male')}
        style={{
          flexDirection: 'row',
          margin: 20,
          width: '80%',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'blue',
          padding: 20,
          borderRadius: 10,
          borderWidth: option == 'male' ? 2 : 0,
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
          I am Man
        </Text>
        <AntDesign name="man" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setoption('female')}
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          width: '80%',
          marginTop: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'blue',
          padding: 20,
          borderRadius: 10,
          borderWidth: option == 'female' ? 2 : 0,
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
          I am Female
        </Text>
        <AntDesign name="woman" size={25} color="white" />
      </TouchableOpacity>
      {option && (
        <TouchableOpacity
          onPress={udatedgender}
          style={{
            margin: 30,
            backgroundColor: 'black',
            padding: 15,
            width: '50%',
            alignSelf: 'center',
            borderRadius: 7,
          }}>
          <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
            Done
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({});
