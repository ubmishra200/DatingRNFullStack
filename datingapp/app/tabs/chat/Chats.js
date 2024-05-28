import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import 'core-js/stable/atob';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import UserChat from '../../componets/UserChat';
import Logout from '../../componets/Logout';

const Chats = () => {
  const [userId, setUserId] = useState('');
  const [profiles, setProfiles] = useState([]);
  const navigation = useNavigation();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    //navigation.navigate('register');
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
        `http://192.168.18.52:3000/received-likes/${userId}/details`,
      );

      setProfiles(response?.data?.receivedLikesDetails);
    } catch (error) {
      console.log('Error fetching user description', error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);
  const fetchUserMatches = async () => {
    try {
      const response = await axios.get(
        `http://192.168.18.52:3000/users/${userId}/matches`,
      );

      const userMatches = response.data.matches;

      setMatches(userMatches);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserMatches();
    }
  }, [userId]);
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchUserMatches();
      }
    }, []),
  );

  return (
    <View style={{flex: 1, margin: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Chats</Text>
        <Ionicons name="chatbox-ellipses-outline" size={30} />
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Selectchats', {
              profiles: profiles,
              userId: userId,
            })
          }
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Ionicons name="heart-outline" size={30} />

          <Text style={{fontSize: 16}}>
            You have got {profiles?.length} likes
          </Text>
          <FontAwesome name="angle-right" size={30} />
        </TouchableOpacity>
      </View>
      <View>
        {matches?.map((item, index) => (
          <UserChat key={index} userId={userId} item={item} />
        ))}
      </View>
      <Logout top={580} right={20} />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
