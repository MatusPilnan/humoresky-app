import React from 'react';
import { ScrollView, TouchableOpacity, View, TextInput, Text, StyleSheet } from 'react-native';

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
      newJoke: null
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.formLabel}>Vtip</Text>
        <TextInput 
          style={styles.form} 
          multiline={true} 
          onChangeText={(jokeBody) => this.setState({jokeBody})} />
        <TouchableOpacity
          onPress={() => this.submit()}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>UROB HUMOR!</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  submit() {
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
  }
});
