import React from 'react';
import { StyleSheet, AsyncStorage, Text } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import NewJokeScreen from '../screens/NewJokeScreen';
import MyCollectionScreen from '../screens/MyCollectionScreen';
import UpdateScreen from '../screens/UpdateScreen';
import JokeDetailScreen from '../screens/JokeDetailScreen';
import AuthScreen from '../screens/AuthScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
},{
  defaultNavigationOptions: {
    headerRight: <Text style={{
      color: 'orange',
      textAlign: 'center',
      textAlignVertical: 'center',
      marginRight: 10
    }}>Prihlásený</Text>
  }
});

HomeStack.navigationOptions = {
  drawerLabel: 'Domov',
};

const NewJokeStack = createStackNavigator({
  NewJoke: NewJokeScreen,
},{
  defaultNavigationOptions: {
    headerRight: <Text style={{
      color: 'orange',
      textAlign: 'center',
      textAlignVertical: 'center',
      marginRight: 10
    }}>Prihlásený</Text>
  }
});

NewJokeStack.navigationOptions = {
  drawerLabel: 'Pridať vtip',
};

const MyCollectionStack = createStackNavigator({
  MyCollection: MyCollectionScreen,
  Update: UpdateScreen,
  JokeDetail: JokeDetailScreen,
},{
  defaultNavigationOptions: {
    headerRight: <Text style={{
      color: 'orange',
      textAlign: 'center',
      textAlignVertical: 'center',
      marginRight: 10
    }}>Prihlásený</Text>
  }
});

MyCollectionStack.navigationOptions = {
  drawerLabel: 'Moje vtipy',
};

export default createDrawerNavigator({
  HomeStack,
  NewJokeStack,
  MyCollectionStack,
  Logout: {
    screen: AuthScreen,
    params: {logout: true},
    navigationOptions: {
      title: 'Odhlásenie'
    }
  }
},{
  drawerBackgroundColor: '#505050',
  contentOptions: {
    inactiveTintColor: 'white',
    activeTintColor: 'black',
    activeBackgroundColor: 'orange',
  },
});
