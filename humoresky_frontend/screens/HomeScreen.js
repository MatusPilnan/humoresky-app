import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import JokeCard from '../components/JokeCard';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Humoresky",
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
      jokes: [], 
      refreshing: false
    }
  }

  componentWillMount() {
    this.getJokes()
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.jokes}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.refreshing}
        keyExtractor={(item, index) => String(item.id)}
        renderItem={({item}) => <JokeCard joke={transform(item)}/>}
        ListEmptyComponent={<Text style={styles.emptyList}>HOPLA! Vyzerá to, že tu nie sú žiadne vtipy. Toto neni sranda!</Text>}
      />
    );
  }
  
  getJokes() {
    return fetch(Expo.Constants.manifest.extra.server + '/api/vtipy')
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        jokes: json.data,
        refreshing: false
      })
      return json.data
    })
    .catch((error) => {
      console.error(error)
    })
  }

  onRefresh() {
    this.setState({jokes: [], refreshing: true}, function() { this.getJokes() });
  }
}

  function transform(joke) {
    return {
      id: joke.id,
      title: joke.nazov,
      description: joke.popis,
      body: joke.telo,
      rating: joke.hodnotenie,
      picture: joke.obrazok,
      user_id: joke.user_id
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#000',
  },
  emptyList: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  }
});
