import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState} from 'react';

import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import Logout from './Logout';

const ProfilesCom = ({item, isEven, userId, setProfiles}) => {
  const colors = ['#F0F8FF', '#FFFFFF'];
  const [liked, setLiked] = useState(false);
  const [selected, setSelcted] = useState(false);
  const handleLike = async selectedUserId => {
    try {
      setLiked(true);
      await axios.post('http://192.168.18.52:3000/create-match', {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles(prevProfiles =>
          prevProfiles.filter(profile => profile._id !== selectedUserId),
        );
        setLiked(false);
      }, 200);
    } catch (error) {
      console.log('error liking', error);
    }
  };

  const handleLikeOther = async selectedUserId => {
    try {
      setSelcted(true);
      await axios.post('http://192.168.18.52:3000/send-like', {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles(prevProfiles =>
          prevProfiles.filter(profile => profile._id !== selectedUserId),
        );
        setSelcted(false);
      }, 200);

      // Handle success: Perform any UI updates or navigate to another screen
    } catch (error) {
      console.error('Error liking user:', error);
      // Handle error scenarios
    }
  };
  if (isEven) {
    return (
      <View style={{padding: 12, backgroundColor: '#F0F8FF'}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 50}}>
            <View>
              <Text style={{fontSize: 17, fontWeight: '600'}}>
                {item?.name}
              </Text>
              <Text
                style={{
                  width: 200,
                  marginTop: 15,
                  fontSize: 18,
                  lineHeight: 24,
                  fontFamily: 'Optima',
                  marginBottom: 8,
                }}>
                {item?.description?.length > 160
                  ? item?.description
                  : item?.description?.substr(0, 160)}
              </Text>
            </View>

            {item?.profileImages?.slice(0, 1).map((item, index) => (
              <Image
                key={index}
                style={{
                  width: 280,
                  height: 280,
                  resizeMode: 'cover',
                  borderRadius: 5,
                }}
                source={{uri: item}}
              />
            ))}
          </View>
        </ScrollView>

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <MaterialCommunityIcons name="dots-vertical" size={30} />
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
              <Pressable
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="diamond-stone"
                  color={'red'}
                  size={30}
                />
              </Pressable>

              {liked ? (
                <Pressable
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#E0E0E0',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Animatable.View
                    animation="swing"
                    easing={'ease-in-out-circ'}
                    iterationCount={1}>
                    <MaterialCommunityIcons
                      name="heart-outline"
                      color={'red'}
                      size={30}
                    />
                  </Animatable.View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => handleLike(item?._id)}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#E0E0E0',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="heart"
                    size={30}
                    color={'red'}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>

        <View style={{marginVertical: 15}} />
      </View>
    );
  } else {
    return (
      <View style={{padding: 12, backgroundColor: '#FFFFFF'}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 50}}>
            {item?.profileImages?.slice(0, 1).map((item, index) => (
              <Image
                key={index}
                style={{
                  width: 200,
                  height: 280,
                  resizeMode: 'cover',
                  borderRadius: 5,
                }}
                source={{uri: item}}
              />
            ))}
            <View>
              <Text style={{fontSize: 17, fontWeight: '600'}}>
                {item?.name}
              </Text>
              <Text
                style={{
                  width: 200,
                  marginTop: 15,
                  fontSize: 18,
                  lineHeight: 24,
                  color: '#333333',
                  marginBottom: 8,
                  fontFamily: 'Optima',
                }}>
                {item?.description}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <MaterialCommunityIcons name="dots-vertical" size={30} />
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
              <Pressable
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#F0F8FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="diamond-stone"
                  color={'red'}
                  size={30}
                />
              </Pressable>

              {selected ? (
                <Pressable
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#6699CC',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Animatable.View
                    animation="swing"
                    easing={'ease-in-out-circ'}
                    iterationCount={1}>
                    <MaterialCommunityIcons
                      name="heart-outline"
                      color={'red'}
                      size={30}
                    />
                  </Animatable.View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => handleLikeOther(item._id)}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#6699CC',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="heart"
                    size={30}
                    color={'red'}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
        <View style={{marginVertical: 15}} />
        <Logout />
      </View>
    );
  }
};

export default ProfilesCom;

const styles = StyleSheet.create({});
