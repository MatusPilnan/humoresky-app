import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  drawerLabel: 'Domov',
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  drawerLabel: 'Links',
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  drawerLabel: 'Settings',
};

export default createDrawerNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
},{
  drawerBackgroundColor: '#505050',
  contentOptions: {
    inactiveTintColor: 'white',
    activeTintColor: 'black',
    activeBackgroundColor: 'orange',
  }
});
