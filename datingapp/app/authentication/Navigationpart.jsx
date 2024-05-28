import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Login.js';
import Register from './Register.js';
import Select from './Select.js';
import BottomTab from '../../BottomTab.jsx';
import Selectchats from '../tabs/chat/Selectchats.js';

import UserChat from '../componets/UserChat.js';
import Chatroom from '../tabs/chat/Chatrooms.js';

const Stack = createNativeStackNavigator();
const Navigationpart = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Select" component={Select} />
        <Stack.Screen name="UserChat" component={UserChat} />
        <Stack.Screen name="Chatroom" component={Chatroom} />

        <Stack.Screen name="Selectchats" component={Selectchats} />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigationpart;

const styles = StyleSheet.create({});
