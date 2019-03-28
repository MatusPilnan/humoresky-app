import React from 'react';
import { ScrollView, TouchableOpacity, View, TextInput, Text, StyleSheet, CameraRoll, Image } from 'react-native';
import { Permissions } from 'expo'

export default class NewJokeScreen extends React.Component {
  static navigationOptions = {
    title: 'Nový vtip',
    headerStyle: {
      backgroundColor: "#505050"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      newJoke: null,
      jokeTitle: '',
      jokeTitleError: false,
      jokeBody: '',
      jokeBodyError: false,
      jokeImageUri: null
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <Text style={ this.state.jokeTitleError ? styles.formLabelError : styles.formLabel }>Názov vtipu (povinné)</Text>
        <TextInput 
          style={ this.state.jokeTitleError ? styles.formError : styles.form } 
          onChangeText={(jokeTitle) => this.setState({jokeTitle})} />


        <Text style={styles.formLabel}>Popis vtipu</Text>
        <TextInput 
          style={styles.form} 
          onChangeText={(jokeDescription) => this.setState({jokeDescription})} />


        <Text style={ this.state.jokeBodyError ? styles.formLabelError : styles.formLabel }>Vtip</Text>
        <TextInput 
          style={ this.state.jokeBodyError ? styles.formError : styles.form } 
          multiline={true} 
          onChangeText={(jokeBody) => this.setState({jokeBody})} />


        <TouchableOpacity
          onPress={() => this.getImage()}>
          <View style={styles.imageButton}>
            <Text style={styles.imageButtonText}>Pridať obrázok</Text>
          </View>
        </TouchableOpacity>

        <Image
          style={{width: 300, height: 100, resizeMode: 'contain'}}
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
          CameraRoll.getPhotos({
            first: 1
          }).then(r => {
            this.setState({
              jokeImageUri: r.edges[0].node.image.uri
            })
          }).catch(error => {
            console.debug(error)
          })
        }
      }).catch(error => {
        console.debug(error)
      })
    
  }

  submit() {
    this.setState({
      jokeTitleError: (this.state.jokeTitle == ''),
      jokeBodyError: (this.state.jokeBody == '')
    })
    if (this.state.newJoke == null) {
      return
    }
    this.state.joke.body = this.state.jokeBody
    console.debug(this.state.joke)
  }
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
  }
});
