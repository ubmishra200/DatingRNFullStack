import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const Logout = ({top, right}) => {
  const navigation = useNavigation();
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      navigation.navigate('login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <View>
    //   <TouchableOpacity onPress={logout}>
    //     <AntDesign name="logout" />
    //   </TouchableOpacity>
    // </View>
    <View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          position: 'absolute',
          top: top,
          right: right,
          height: 50,
          backgroundColor: 'red',
          borderRadius: 100,
        }}
        onPress={logout}>
        <AntDesign name="logout" color="white" size={35} />
      </TouchableOpacity>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});
