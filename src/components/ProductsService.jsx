import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQty, incrementQty } from '../../ProductReducer';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity
} from '../../CartReducer';

const ProductsService = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(item)); // cart
    dispatch(incrementQty(item)); // product
  };
  return (
    <View className=''>
      <Pressable className='flex flex-row justify-between items-center p-5 bg-white rounded-lg mx-4 mb-3'>
        <View className='w-12 h-12'>
          <Image className='w-full h-full' source={{ uri: item.image }} />
        </View>
        <View>
          <Text className='capitalize font-semibold'>{item.name}</Text>
          <Text className='font-semibold'>${item.price}</Text>
        </View>
        {cart.some((c) => c.id === item.id) ? (
          <Pressable className='flex-row px-[10] py-5'>
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item)); //Cart
                dispatch(decrementQty(item)); //Product
              }}
              className='w-[26] h-[26] rounded-3xl border-[#BEBEBE] bg-[#E0E0E0] justify-center items-center'
            >
              <Text
                className='
                text-[15px]
                  font-semibold
                  text-[#088f8f]
                  px-[6]
                  text-center
                '
              >
                -
              </Text>
            </Pressable>
            <Pressable>
              <Text className='font-semibold text-[#088f8f] px-[8] text-[19px]'>
                {item.quantity}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(item)); // cart
                dispatch(incrementQty(item)); //product
              }}
              className='w-[26] h-[26] rounded-3xl border-[#BEBEBE] bg-[#E0E0E0] justify-center items-center'
            >
              <Text
                className='
                text-[15px]
                font-semibold
                text-[#088f8f]
                px-[6]
                text-center
              '
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable
            onPress={addItemToCart}
            className='border-[1px] px-4 py-2 rounded-md border-teal-600'
          >
            <Text className='text-teal-600 font-bold'>Add</Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default ProductsService;
