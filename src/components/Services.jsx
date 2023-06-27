import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React from 'react';

const services = [
  {
    id: '0',
    image: 'https://cdn-icons-png.flaticon.com/128/3003/3003984.png',
    name: 'Washing'
  },
  {
    id: '11',
    image: 'https://cdn-icons-png.flaticon.com/128/2975/2975175.png',
    name: 'Laundry'
  },
  {
    id: '12',
    image: 'https://cdn-icons-png.flaticon.com/128/9753/9753675.png',
    name: 'Wash & Iron'
  },
  {
    id: '13',
    image: 'https://cdn-icons-png.flaticon.com/128/995/995016.png',
    name: 'Cleaning'
  }
];

const Services = () => {
  return (
    <View className='p-4'>
      <Text className='font-semibold text-lg mb-2'>Services Offered</Text>
      <ScrollView
        horizontal={true}
        alwaysBounceHorizontal={false}
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {services.map((service, index) => (
          <Pressable key={index} className='p-6 bg-white m-2 rounded-lg'>
            <Image className='w-[70] h-[70]' source={{ uri: service.image }} />
            <Text className='mt-1 text-center'>{service.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
