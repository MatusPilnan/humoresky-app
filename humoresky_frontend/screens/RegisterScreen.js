import React from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import HeaderButton from '../components/HeaderButton';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Registrácia',
    headerStyle: {
      backgroundColor: "#505050"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerLeft: <HeaderButton />
  };

  render() {
    return(
      <View>
          
      </View>
    )
  }
}