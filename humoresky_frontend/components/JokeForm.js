import React from 'react';
import { ScrollView, TouchableOpacity, View, TextInput, Text, StyleSheet, CameraRoll, Image } from 'react-native';
import { Permissions, ImagePicker } from 'expo'
import { NavigationEvents } from 'react-navigation'

export default class JokeForm extends React.Component {
  constructor(props) {
    super(props)
    console.debug('KONSTRUKTOR OBRAZOVKY NOVEHO VTIPU')
    this.state = initialState
  }

  clear() {
    this.setState(initialState)
    this.textInputBody.clear()
    this.textInputDescription.clear()
    this.textInputBody.clear()
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <NavigationEvents
          onDidFocus={(payload) => this.clear()}
        />
        <Text style={ this.state.jokeTitleError ? styles.formLabelError : styles.formLabel }>Názov vtipu (povinné)</Text>
        <TextInput 
          value={this.state.jokeTitle}
          style={ this.state.jokeTitleError ? styles.formError : styles.form } 
          onChangeText={(jokeTitle) => this.setState({jokeTitle})}
          ref={input => { this.textInputTitle = input}} />


        <Text style={styles.formLabel}>Popis vtipu</Text>
        <TextInput 
          value={this.state.jokeDescription}
          style={styles.form} 
          onChangeText={(jokeDescription) => this.setState({jokeDescription})}
          ref={input => { this.textInputDescription = input }} />


        <Text style={ this.state.jokeBodyError ? styles.formLabelError : styles.formLabel }>Vtip</Text>
        <TextInput 
          value={this.state.jokeBody}
          style={ this.state.jokeBodyError ? styles.formError : styles.form } 
          multiline={true} 
          onChangeText={(jokeBody) => this.setState({jokeBody})}
          ref={input => { this.textInputBody = input }} />

        <Text style={ this.state.jokeBodyError ? {color: 'orange'} : {color: 'black'}}>Musíš zadať telo vtipu alebo obrázok!</Text>

        <TouchableOpacity
          onPress={() => this.getImage()}>
          <View style={ this.state.jokeBodyError ? styles.imageError : styles.imageButton }>
            <Text style={ this.state.jokeBodyError ? styles.imageErrorText : styles.imageButtonText }>
              {this.state.jokeImageUri == null ? "Pridať obrázok" : "Zmeniť obrázok"}
            </Text>
          </View>
        </TouchableOpacity>

        <Image
          style={{width: 90, height: 100, resizeMode: 'contain'}}
          source={{uri: this.state.jokeImageUri}} />

        <TouchableOpacity
          onPress={() => this.submit()}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>UROB HUMOR!</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  getImage() {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(perm => {
        if (perm.status == 'granted') {
          ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images, base64: true})
          .then(response => {
            if (!response.cancelled) {
                this.setState({
                  jokeImageUri: response.uri,
                  jokeImageB64: response.base64
              })
            }
          })
        }
      }).catch(error => {
        console.debug(error)
      })
    
  }

  submit() {
    this.setState({
      jokeTitleError: (this.state.jokeTitle == ''),
      jokeBodyError: (this.state.jokeBody == '' && this.state.jokeImageB64 == null)
    })
    if (this.state.newJoke == null) {
      return
    }
    this.state.joke.body = this.state.jokeBody
    console.debug(this.state.joke)
  }
}

const initialState = {
  newJoke: null,
  jokeTitle: '',
  jokeTitleError: false,
  jokeDescription: '',
  jokeBody: '',
  jokeBodyError: false,
  jokeImageUri: null,
  jokeImageB64: null
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
  imageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    backgroundColor: 'black',
    marginBottom: 15,
    marginTop: 20
  },
  imageButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  imageError: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'orange',
    color: 'orange',
    height: 50,
    backgroundColor: 'black',
    marginBottom: 15,
    marginTop: 20
  },
  imageErrorText: {
    color: 'orange',
    fontSize: 20,
    textAlign: 'center'
  }
});
