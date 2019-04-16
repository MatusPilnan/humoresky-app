import React from 'react'
import { View, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'

export default class AuthScreen extends React.Component {
  static navigationOptions = {
    title: "Humoresky 😂😂😂",
    headerStyle: {
      backgroundColor: "#505050"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.didFocus()} />
        <ActivityIndicator size='large' color='white' />
      </View>
    )
  }

  didFocus() {
    logout = this.props.navigation.getParam('logout', false)
    if (logout) {
      console.debug('odhlasujem')
      this.logout()
    } else {
      console.debug('kontrolujem')
      this.getAuth()
    }
  }

  logout() {
    AsyncStorage.removeItem('apiToken').then(() => {
      this.props.navigation.navigate('Main')
    })
  }

  getAuth() {
    AsyncStorage.getItem('apiToken').then(apiToken => {
      if (apiToken != null) {
        console.debug('token not null ' + apiToken)
        this.props.navigation.navigate('LoggedIn')
      } else {
        console.debug('token null ' +apiToken)
        this.props.navigation.navigate('Guest')
      }
    }).catch(() => {
      console.debug('catch')
      this.props.navigation.navigate('Guest')
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 5,
    backgroundColor: 'black',
  }
})