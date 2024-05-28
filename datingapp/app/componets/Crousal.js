import React, {useRef, memo, useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
// const data = [
//   {
//     id: '1',
//     title: 'Aenean leo',
//     body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
//     imgUrl: 'https://picsum.photos/id/11/200/300',
//   },
//   {
//     id: '2',
//     title: 'In turpis',
//     body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis.',
//     imgUrl: 'https://picsum.photos/id/10/200/300',
//   },
//   {
//     id: '3',
//     title: 'Lorem Ipsum',
//     body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
//     imgUrl: 'https://picsum.photos/id/12/200/300',
//   },
// ];

const Carousel = ({data}) => {
  const [photodes, setphotodes] = useState('');
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          data={data}
          renderItem={item => (
            <View style={{flex: 1}} key={item.id}>
              <View
                style={{
                  flex: 1,
                  width: width,
                  height: 300,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  disabled
                  style={{
                    flex: 1,
                    width: 300,
                    height: 300,
                  }}>
                  <Image
                    resizeMethod="cover"
                    source={{uri: item?.item}}
                    style={{
                      width: 300,
                      height: 300,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        <View style={{flexDirection: 'row'}}>
          {data?.map((item, index) => (
            <View
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'black',
                margin: 10,
              }}></View>
          ))}
        </View>
        {/* <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: 300,
        }}>
        <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
          Add Picture Profile Descrioption
        </Text>
        <TextInput
          style={{
            width: '100%',
            marginTop: 7,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 7,
            padding: 5,
          }}
          placeholder="add description"
          value={photodes}
          onChangeText={e => setphotodes(e)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            margin: 5,
            width: '100%',
            alignSelf: 'center',
            borderRadius: 7,
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
              justifyContent: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
            }}>
            add Photo
          </Text>
        </TouchableOpacity>
      </View> */}
      </View>
    </ScrollView>
  );
};

export default Carousel;
