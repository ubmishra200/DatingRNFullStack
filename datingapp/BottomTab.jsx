import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Bio from './app/tabs/bio/Bio';
import Chats from './app/tabs/chat/Chats';
import Profile from './app/tabs/profile/Profile';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logout from './app/componets/Logout';
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="bio"
        component={Bio}
        options={{
          headerRight: () => <Logout top={-25} right={21} />,
          tabBarIcon: ({color, size}) => (
            <Feather name="eye" color={color} size={35} />
          ),
          tabBarLabelStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="chat"
        component={Chats}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={color}
              size={35}
            />
          ),
          tabBarLabelStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerRight: () => <Logout top={-25} right={21} />,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="guy-fawkes-mask"
              color={color}
              size={35}
            />
          ),
          tabBarLabelStyle: {display: 'none'},
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
