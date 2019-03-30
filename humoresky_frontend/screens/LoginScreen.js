import React from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import HeaderButton from '../components/HeaderButton';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Prihlásenie',
    headerStyle: {
      backgroundColor: "#505050"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerLeft: <HeaderButton />
  };
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <NavigationEvents onDidFocus={() => this.setState(initialState)} />

          <Text style={this.state.loginError ? styles.formLabelError : styles.formLabel}>E-mail alebo prezývka</Text>
          <TextInput
            style={this.state.loginError ? styles.formError : styles.form}
            value={this.state.login}
            autoCapitalize='none'
            keyboardType='email-address'
            autoCorrect={false}
            onChangeText={(input) => this.setState({
              login: input,
              password: this.state.password,
              loginError: (input == ''),
              passwordError: this.state.passwordError,
            })}
          />

          <Text style={this.state.passwordError ? styles.formLabelError : styles.formLabel}>Heslo</Text>
          <TextInput
            style={this.state.passwordError ? styles.formError : styles.form}
            value={this.state.password}
            autoCapitalize='none'
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(input) => this.setState({
              login: this.state.login,
              password: input,
              loginError: this.state.loginError,
              passwordError: (input == ''),
            })}
          />
        </ScrollView>

        <TouchableOpacity
          onPress={() => this.submit()}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>Prihlásiť sa</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.noAccountContainer}>
            <Text style={styles.noAccountText}>Nemáš účet?  </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.noAccountLink}>Zaregistruj sa!</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  submit() {
    this.setState({
      loginError: (this.state.login == ''),
      passwordError: (this.state.password == ''),
    })
    if (this.state.login == '' || this.state.login == '') return


    fetch(Expo.Constants.manifest.extra.server + '/api/login', {
      method: 'POST',
      headers: {
        Accept: 'applocation/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password,
      })
    }).then(response => {
      if (response.ok) {
        response.json().then((json) => {
          console.debug(json)
          AsyncStorage.multiSet([['apiToken', json.api_token], ['user', this.state.login]]).catch(error => console.error(error))
          this.props.navigation.navigate('LoggedIn')
        }).catch(error => console.error(error))
      }
      else {
        this.setState(initialState)
        alert('Nepodarilo sa prihlásiť.')
      }
    }).catch(error => {
      console.error(error)
      alert('Prihlasovanie zlyhalo.')
    })
    
  }
}

const initialState = {
  login: '',
  password: '',
  loginError: false,
  passwordError: false,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  formLabel: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
    marginBottom: 7
  },
  form: {
    color: 'white',
    padding: 7,
    borderRadius: 4,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 15
  },
  formLabelError: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'orange',
    marginBottom: 7
  },
  formError: {
    color: 'orange',
    padding: 7,
    borderRadius: 4,
    borderColor: 'orange',
    borderWidth: 1,
    marginBottom: 15
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    height: 50,
    backgroundColor: 'orange',

  },
  submitText: {
    color: 'black',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  noAccountContainer: {
    flexDirection:'row',
    justifyContent: 'space-evenly',
    height: 50,
    padding: 15,
    backgroundColor: 'black'
  },
  noAccountText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  noAccountLink: {
    color: 'orange',
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
  }
});
