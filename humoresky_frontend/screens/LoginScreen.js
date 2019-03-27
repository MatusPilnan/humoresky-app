import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Prihlásenie',
    headerStyle: {
      backgroundColor: "#505050"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000',
  },
});
