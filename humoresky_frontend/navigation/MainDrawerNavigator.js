import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import NewJokeScreen from '../screens/NewJokeScreen';
import RegisterScreen from '../screens/RegisterScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
});

HomeStack.navigationOptions = {
  drawerLabel: 'Domov',
};

const LoginStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

LoginStack.navigationOptions = {
  drawerLabel: 'Prihlásenie',
};

export default createDrawerNavigator({
  HomeStack,
  LoginStack
},{
  drawerBackgroundColor: '#505050',
  contentOptions: {
    inactiveTintColor: 'white',
    activeTintColor: 'black',
    activeBackgroundColor: 'orange',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});