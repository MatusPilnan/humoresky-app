import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';
import LoggedInDrawerNavigator from './LoggedInDrawerNavigator'
import AuthScreen from '../screens/AuthScreen'

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: AuthScreen,
  Guest: MainDrawerNavigator,
  LoggedIn: LoggedInDrawerNavigator
}));