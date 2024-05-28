import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import 'core-js/stable/atob';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import ProfilesCom from '../../componets/ProfilesCom';

const Bio = () => {
  const navigation = useNavigation();

  const [userId, setUserId] = useState('');
  const [user, setUser] = useState();
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('auth');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(
        `http://192.168.18.52:3000/users/${userId}`,
      );

      const user = response.data;
      setUser(user?.user);
    } catch (error) {
      console.log('Error fetching user description', error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://192.168.18.52:3000/profiles', {
        params: {
          userId: userId,
          gender: user?.gender,
          turnOns: user?.turnOns,
          lookingFor: user?.lookingFor,
        },
      });

      setProfiles(response.data.profiles);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);
  useEffect(() => {
    if (userId && user) {
      fetchProfiles();
    }
  }, [userId, user]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={profiles}
        keyExtractor={item => item._id}
        renderItem={({item, index}) => (
          <ProfilesCom
            item={item}
            key={index}
            userId={userId}
            user={user}
            setProfiles={setProfiles}
            isEven={index % 2 === 0}
          />
        )}
      />
    </View>
  );
};

export default Bio;

const styles = StyleSheet.create({});
