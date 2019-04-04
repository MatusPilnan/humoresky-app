import React from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
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
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return(
      <View style={styles.container}>
          <ScrollView style={styles.container}>
          <NavigationEvents onDidFocus={() => this.setState(initialState)} />

          <Text style={this.state.emailError ? styles.formLabelError : styles.formLabel}>E-mail</Text>
          <TextInput
            style={this.state.emailError ? styles.formError : styles.form}
            value={this.state.email}
            autoCapitalize='none'
            keyboardType='email-address'
            autoCorrect={false}
            onChangeText={(input) => this.setState({
              email: input,
              emailError: (input == ''),
            })}
          />
          <Text style={ this.state.emailError ? {color: 'orange'} : {color: 'black'}}>{this.state.emailErrorMsg}</Text>

          <Text style={this.state.nickError ? styles.formLabelError : styles.formLabel}>Prezývka</Text>
          <TextInput
            style={this.state.nickError ? styles.formError : styles.form}
            value={this.state.nick}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(input) => this.setState({
              nick: input,
              nickError: (input == ''),
            })}
          />
          <Text style={ this.state.nickError ? {color: 'orange'} : {color: 'black'}}>{this.state.nickErrorMsg}</Text>

          <Text style={this.state.passwordError ? styles.formLabelError : styles.formLabel}>Heslo</Text>
          <TextInput
            style={this.state.passwordError ? styles.formError : styles.form}
            value={this.state.password}
            autoCapitalize='none'
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(input) => this.setState({
              password: input,
              passwordError: (input == ''),
            })}
          />
          <Text style={ this.state.passwordError ? {color: 'orange'} : {color: 'black'}}>{this.state.passwordErrorMsg}</Text>

          <Text style={this.state.passwordConfirmError ? styles.formLabelError : styles.formLabel}>Zopakovať heslo</Text>
          <TextInput
            style={this.state.passwordConfirmError ? styles.formError : styles.form}
            value={this.state.passwordConfirm}
            autoCapitalize='none'
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(input) => this.setState({
              passwordConfirm: input,
              passwordConfirmError: (input == ''),
            })}
          />
          <Text style={ this.state.passwordConfirmError ? {color: 'orange'} : {color: 'black'}}>{this.state.passwordConfirmErrorMsg}</Text>

        </ScrollView>

        { this.state.submitting ?
        <ActivityIndicator size="large" color="orange" />
        :
        <TouchableOpacity
          onPress={() => this.submit()}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>Registrovať sa</Text>
          </View>
        </TouchableOpacity>
        }
      </View>
    )
  }

  submit() {
    err = false
    this.setState({
      emailError: (this.state.email == ''),
      nickError: (this.state.nick == ''),
      passwordError: (this.state.password == ''),
      passwordConfirmError: (this.state.passwordConfirm == ''),
      emailErrorMsg: 'E-mail nesmie byť prázdny',
      nickErrorMsg: 'Nick nesmie byť prázdny',
      passwordErrorMsg: 'Heslo nesmie byť prázdne',
      passwordConfirmErrorMsg: 'Potvrdenie nesmie byť prázdne',
    })
    if ((this.state.email == '') || (this.state.nick == '') || (this.state.password == '') || (this.state.passwordConfirm == '')) {
      err = true
    }
    if (this.state.password.length < 8) {
      this.setState({
        passwordError: true,
        passwordErrorMsg: 'Heslo musí mať aspoň 8 znakov',
      })
      err = true
    }
    if (this.state.password != this.state.passwordConfirm) {
      this.setState({
        passwordConfirmError: true,
        passwordConfirmErrorMsg: 'Heslo sa nezhoduje s potvrdením',
      })
      err = true
    }

    if (err) return

    this.setState({
      submitting: true,
    })
    fetch(Expo.Constants.manifest.extra.server + '/api/register', {
      method: 'POST',
      headers: {
        Accept: 'applocation/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.nick,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirm
      })
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          AsyncStorage.multiSet([['apiToken', json.api_token], ['user', this.state.nick]]).catch(error => console.error(error))
          this.props.navigation.navigate('LoggedIn')
        }).catch(error => console.error(error))
      } else {
        response.json().then((json) => {
          if (typeof json.errors !== 'undefined' && typeof json.errors.email !== 'undefined') {
            this.setState({
              emailError: true,
              emailErrorMsg: dictionary[json.errors.email[0]],
              submitting: false
            })
          }
        })
      }
    }).catch((error) => {
      console.error(error)
      this.setState({
        submitting: false
      })
    })
  }
}

const initialState = {
  email: '',
  nick: '',
  password: '',
  passwordConfirm: '',
  emailError: false,
  nickError: false,
  passwordError: false,
  passwordConfirmError: false,
  submitting: false,
}

const dictionary = {
  'The email must be a valid email address.': 'E-mailová adresa musí byť platná', 
  'The email has already been taken.': 'Účet s týmto e-mailom už existuje.'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#000',
  },
  formLabel: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
    marginBottom: 7,
    marginTop: 10
  },
  form: {
    color: 'white',
    padding: 7,
    borderRadius: 4,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 5
  },
  formLabelError: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'orange',
    marginBottom: 7,
    marginTop: 10
  },
  formError: {
    color: 'orange',
    padding: 7,
    borderRadius: 4,
    borderColor: 'orange',
    borderWidth: 1,
    marginBottom: 5
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