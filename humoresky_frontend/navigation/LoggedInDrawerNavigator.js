import React from 'react';
import { StyleSheet, AsyncStorage, Text } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import NewJokeScreen from '../screens/NewJokeScreen';

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

export default createDrawerNavigator({
  HomeStack,
  NewJokeStack,
},{
  drawerBackgroundColor: '#505050',
  contentOptions: {
    inactiveTintColor: 'white',
    activeTintColor: 'black',
    activeBackgroundColor: 'orange',
  },
});
