import React from 'react';
import { ScrollView, TouchableOpacity, View, TextInput, Text, StyleSheet, Alert, Image, AsyncStorage, ActivityIndicator, NetInfo  } from 'react-native';
import { Permissions, ImagePicker } from 'expo'
import { NavigationEvents } from 'react-navigation'

import HeaderButton from '../components/HeaderButton';

export default class NewJokeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title', 'Nový vtip'),
      headerStyle: {
        backgroundColor: "#505050"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: <HeaderButton />
    }
  };

  constructor(props) {
    super(props)
    this.state = initialState
  }

  clear() {
    this.props.navigation.setParams({ title: "Nový vtip"})
    this.setState(initialState)
    jokeParam = this.props.navigation.getParam('joke', null)
    if (jokeParam != null) {
      this.setState({
        joke: jokeParam,
        jokeImageB64: jokeParam.picture
      })
      this.props.navigation.setParams({ title: "Úprava vtipu"})
    }
    this.props.navigation.setParams({joke: null})
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <NavigationEvents
          onDidFocus={(payload) => this.clear()}
        />
        <Text style={ this.state.jokeTitleError ? styles.formLabelError : styles.formLabel }>Názov vtipu (povinné)</Text>
        <TextInput 
          value={this.state.joke.title}
          autoCorrect={true}
          style={ this.state.jokeTitleError ? styles.formError : styles.form } 
          maxLength={254}
          onChangeText={(jokeTitle) => this.setState({
            joke: {
              id: this.state.joke.id,
              title: jokeTitle,
              description: this.state.joke.description,
              body: this.state.joke.body,
              rating: this.state.joke.rating,
              picture: this.state.joke.picture,
              user_id: this.state.joke.user_id
            },
          })}
        />


        <Text style={styles.formLabel}>Popis vtipu</Text>
        <TextInput 
          value={this.state.joke.description}
          style={styles.form} 
          autoCorrect={true}
          onChangeText={(jokeDescription) => this.setState({
            joke: {
              id: this.state.joke.id,
              title: this.state.joke.title,
              description: jokeDescription,
              body: this.state.joke.body,
              rating: this.state.joke.rating,
              picture: this.state.joke.picture,
              user_id: this.state.joke.user_id
            },
          })}
        />


        <Text style={ this.state.jokeBodyError ? styles.formLabelError : styles.formLabel }>Vtip</Text>
        <TextInput 
          value={this.state.joke.body}
          autoCorrect={true}
          style={ this.state.jokeBodyError ? styles.formError : styles.form } 
          multiline={true} 
          onChangeText={(jokeBody) => this.setState({
            joke: {
              id: this.state.joke.id,
              title: this.state.joke.title,
              description: this.state.joke.description,
              body: jokeBody,
              rating: this.state.joke.rating,
              picture: this.state.joke.picture,
              user_id: this.state.joke.user_id
            },
          })}
        />

        <Text style={ this.state.jokeBodyError ? {color: 'orange'} : {color: 'black'}}>Musíš zadať telo vtipu alebo obrázok!</Text>

          <TouchableOpacity
            onPress={() => this.getImage()}>
            <View style={ this.state.jokeBodyError ? styles.imageError : styles.imageButton }>
              <Text style={ this.state.jokeBodyError ? styles.imageErrorText : styles.imageButtonText }>
                {this.state.joke.picture == null ? "Pridať obrázok" : "Zmeniť obrázok"}
              </Text>
            </View>
          </TouchableOpacity>
        
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>

          <Image
            style={this.state.joke.picture == null ? {height: 0} : {width: 90, height: 100, marginBottom: 20, resizeMode: 'contain'}}
            source={{uri: this.state.joke.picture}} />

          <TouchableOpacity
            onPress={() => this.setState({
              joke: {
                id: this.state.joke.id,
                title: this.state.joke.title,
                description: this.state.joke.description,
                body: this.state.joke.body,
                rating: this.state.joke.rating,
                picture: null,
                user_id: this.state.joke.user_id
              },
              jokeImageB64: null
            })}>

            <View style={ this.state.joke.picture == null ? {width: 0} : styles.removeImageButton }>
              <Text style={ styles.removeImageText }>
                ❌
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        { this.state.submitting ?
          <ActivityIndicator size='large' color='orange' />
          :
          <TouchableOpacity
            onPress={() => this.submit()}>
            <View style={styles.submitButton}>
              <Text style={styles.submitText}>UROB HUMOR!</Text>
            </View>
          </TouchableOpacity>
        }
        </ScrollView>
    )
  }

  getImage() {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(perm => {
        if (perm.status == 'granted') {
          ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images, base64: true})
          .then((response) => {
            if (!response.cancelled) {
                this.setState({
                  joke: {
                    id: this.state.joke.id,
                    title: this.state.joke.title,
                    description: this.state.joke.description,
                    body: this.state.joke.body,
                    rating: this.state.joke.rating,
                    picture: response.uri,
                    user_id: this.state.joke.user_id
                  },
                  jokeImageB64: response.base64,
                  jokeBodyError: false
              })
            }
          }).catch(error => console.debug(error))
        }
      }).catch(error => {
        console.debug(error)
      })
    
  }

  submitOffline() {
    // AsyncStorage.removeItem('offlineJokes'); return
    AsyncStorage.getItem('offlineJokes')
    .then((offlineJokes) => {     
      if (offlineJokes == null) {
        offlineJokes = []
      } else {
        offlineJokes = JSON.parse(offlineJokes)
      }
      offlineJokes.push({
        nazov: this.state.joke.title,
        popis: this.state.joke.description,
        telo: this.state.joke.body,
        obrazok:  this.state.joke.picture
      })
      AsyncStorage.setItem('offlineJokes', JSON.stringify(offlineJokes))
      .then(() => {
        this.props.navigation.navigate('MyCollection')
        alert('Vtip sa nahrá keď nebudeš mimo pokrytia.')
      })
    }).catch((error) => {
      console.error(error)
    })
  }

  submit() {
    this.setState({
      jokeTitleError: (this.state.joke.title == ''),
      jokeBodyError: (this.state.joke.body == '' && this.state.jokeImageB64 == null)
    })
    if (this.state.jokeBodyError || this.state.jokeTitleError || this.state.jokeTitleError) return

    AsyncStorage.getItem('apiToken').then((apiToken) => {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (!isConnected) {
          Alert.alert(
            'Nepripojený!',
            'Zapni internet a skús to znova. Alebo máme urobiť vtip keď nebudeš mimo pokrytia?',
            [
              {text: 'Nehajte tak, pohoda'},
              {text: 'Nó poprosím vás', onPress: () => this.submitOffline()}
            ]
          )
        } else{
          this.setState({
            submitting: true
          })
          fetch(Expo.Constants.manifest.extra.server + '/api/vtip/uloz', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ apiToken
            },
            body: JSON.stringify({
              nazov: this.state.joke.title,
              popis: this.state.joke.description,
              telo: this.state.joke.body,
              obrazok: this.state.jokeImageB64 == null ? '' : 'data:image/png;base64,' + this.state.jokeImageB64
            }),
          }).then(response => {
            if (response.ok) {
              this.props.navigation.navigate('MyCollection')
              alert('Úspešne uložený!')
            }
          }).catch(error => {
            this.setState({
              submitting: false
            })
            alert('Odosielanie zlyhalo!')
          })
        }
      })
    })
  }
}

const initialState = {
  joke: {
    id: null,
    title: '',
    description: '',
    body: '',
    rating: null,
    picture: null,
    user_id: null
  },
  jokeTitleError: false,
  jokeBodyError: false,
  jokeImageB64: null,
  submitting: false
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
    width: '100%',
    backgroundColor: 'black',
    marginBottom: 15,
    marginTop: 10
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
  },
  removeImageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'red',
    height: 50,
    width: '85%',
    backgroundColor: 'black',
    marginBottom: 15,
    marginTop: 20,
    marginLeft: 10,
    width: 40,
  },
  removeImageText: {
    fontSize: 20,
    textAlign: 'center'
  }
});
