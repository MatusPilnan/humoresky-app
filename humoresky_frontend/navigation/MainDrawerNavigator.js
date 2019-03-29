import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import NewJokeScreen from '../screens/NewJokeScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
});

HomeStack.navigationOptions = {
  drawerLabel: 'Domov',
};

const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

LoginStack.navigationOptions = {
  drawerLabel: 'Prihlásenie',
};

const NewJokeStack = createStackNavigator({
  NewJoke: NewJokeScreen,
});

NewJokeStack.navigationOptions = {
  drawerLabel: 'Pridať vtip',
  params: {}
};

export default createDrawerNavigator({
  HomeStack,
  LoginStack,
  NewJokeStack,
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