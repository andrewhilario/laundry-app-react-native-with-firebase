import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './store';
import StackNavigator from './StackNavigator';
import SafeViewAndroid from './src/components/SafeViewAndroid';

export default function App() {
  return (
    <Provider store={store}>
      <View
        className='w-full h-full bg-white'
        style={SafeViewAndroid.AndroidSafeArea}
      >
        {/* <HomeScreen /> */}
        <StackNavigator />
        <StatusBar style='auto' />
      </View>
    </Provider>
  );
}
