import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Alert } from 'react-native'
import { withNavigation } from 'react-navigation'

import JokeCard from '../components/JokeCard';

class MyJokeCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { joke: props.joke }
  }

  render() {
    return (
      <View>
        <JokeCard joke={this.state.joke}/>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.updateButton}
            onPress={() => this.update()}>
            <View>
              <Text style={styles.updateText}>Upraviť</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.deleteButton}
            onPress={() => this.deleteAlert()}>
            <View>
              <Text style={styles.deleteText}>Vymazať</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  deleteAlert() {
    Alert.alert(
      'Ide sa mazať!',
      'Túto akciu nemožno vrátiť späť.',
      [
        {text: 'Beriem späť'},
        {text: 'OK', onPress: () => this.delete()},
      ],
    );
  }

  delete() {
    AsyncStorage.getItem('apiToken').then((apiToken) => {
      fetch(Expo.Constants.manifest.extra.server + '/api/vtip/vymaz', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ apiToken
        },
        body: JSON.stringify({
          joke: this.state.joke.id
        })
      }).then(response => {
        if (response.ok) {
          this.props.navigation.navigate('MyCollection')
          alert('Úspešne vymazaný!')
        }
      }).catch(error => {
        console.error(error)
        this.setState({
          submitting: false
        })
        alert('Mazanie zlyhalo!')
      })
    })
  }

  update() {
    //this.props.navigator.push({name: 'Update', passProps: {joke: this.state.joke}})
    this.props.navigation.navigate('Update', {joke: this.state.joke})
  }
}

export default withNavigation(MyJokeCard)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
    padding: 5,
    height: 80,
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    width: '80%'
  },
  text: {
    color: 'white',
  },
  buttons: {
    margin: 5,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    borderRadius: 4,
    height: 50,
    backgroundColor: 'orange'
  },
  updateText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deleteButton: {
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    borderRadius: 4,
    height: 50,
    backgroundColor: 'red'
  },
  deleteText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
})