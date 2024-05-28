import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {Ionicons} from '@expo/vector-icons';
// import {useLocalSearchParams} from 'expo-router';
// import {Entypo, Feather} from '@expo/vector-icons';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
import {io} from 'socket.io-client';
import axios from 'axios';

const Chatrooms = ({route}) => {
  const {image, name, receiverId, senderId} = route.params;

  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  // const params = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const socket = io('http://192.168.18.52:8000');
  socket.on('connect', () => {
    console.log('Connected to the Socket.IO server');
  });
  socket.on('receiveMessage', newMessage => {
    //update the state to include new message
    setMessages(prevMessages => [...prevMessages, newMessage]);
  });
  const sendMessage = async (senderId, receiverId) => {
    socket.emit('sendMessage', {senderId, receiverId, message});

    setMessage('');

    // call the fetchMessages() function to see the UI update
    setTimeout(() => {
      fetchMessages();
    }, 200);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                resizeMode: 'cover',
              }}
              source={{uri: image}}
            />
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{name}</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
          <MaterialCommunityIcons
            name="video-outline"
            size={30}
            color="black"
          />
        </View>
      ),
    });
  }, []);
  const fetchMessages = async () => {
    try {
      // const senderId = senderId;
      // const receiverId = receiverId;

      const response = await axios.get('http://192.168.18.52:3000/messages', {
        params: {senderId, receiverId},
      });

      setMessages(response.data);
    } catch (error) {
      console.log('Error fetching the messages', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {messages?.map((item, index) => (
          <Pressable
            key={index}
            style={[
              item?.senderId === senderId
                ? {
                    alignSelf: 'flex-end',
                    backgroundColor: '#F08080',
                    padding: 8,
                    maxWidth: '60%',
                    borderRadius: 7,
                    margin: 10,
                  }
                : {
                    alignSelf: 'flex-start',
                    backgroundColor: '#DB7093',
                    padding: 8,
                    margin: 10,
                    borderRadius: 7,
                    maxWidth: '60%',
                  },
            ]}>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'left',
                color: 'white',
                fontWeight: '500',
              }}>
              {item?.message}
            </Text>
            <Text
              style={{
                fontSize: 9,
                textAlign: 'right',
                color: '#F0F0F0',
                marginTop: 5,
              }}>
              {formatTime(parseInt(item?.timestamp, 10))}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          marginBottom: 1,
        }}>
        <MaterialCommunityIcons
          name="emoticon-happy-outline"
          size={24}
          color="black"
        />

        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#dddddd',
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type your message..."
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginHorizontal: 8,
          }}>
          <MaterialCommunityIcons
            name="camera-outline"
            size={24}
            color="gray"
          />
          <MaterialCommunityIcons name="microphone" size={24} color="gray" />
        </View>

        <Pressable
          onPress={() => sendMessage(senderId, receiverId)}
          style={{
            backgroundColor: '#007bff',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chatrooms;

const styles = StyleSheet.create({});
