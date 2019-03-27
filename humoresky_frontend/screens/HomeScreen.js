import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import JokeCard from '../components/JokeCard';
import { FlatList } from 'react-native-gesture-handler';

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
      <View style={styles.container}>
        <FlatList
          data={this.state.jokes}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={({item}) => <JokeCard joke={transform(item)}/>}
        />
      </View> 
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
    this.setState({refreshing: true}, function() { this.getJokes() });
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
    backgroundColor: '#000',
  },
  
});
