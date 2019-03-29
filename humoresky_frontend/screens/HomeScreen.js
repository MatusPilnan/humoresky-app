import React from 'react';
import {
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import JokeCard from '../components/JokeCard';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Humoresky 😂😂😂",
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
      refreshing: true,
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
        renderItem={({item}) => <JokeCard joke={transform(item)} />}
        ListEmptyComponent={() => this.emptyList()}
      />
    );
  }
  
  getJokes() {
    return fetch(Expo.Constants.manifest.extra.server + '/api/vtipy')
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        jokes: json.data,
        refreshing: false,
      })
      return json.data
    })
    .catch((error) => {
      console.debug(error)
      this.setState({
        refreshing: false,
      })
    })
  }

  emptyList() {
    if (this.state.refreshing) {
      return (
      <View style={styles.emptyListContainer}>
        <View style={{height: Dimensions.get('screen').height * 0.3}} />
        <Text style={styles.emptyList}>Zháňam najčerstvejšie humory...</Text>
        <View style={{height: 20}} />
        <ActivityIndicator size="large" color="white" />
      </View>
    )
    }
    return (
      <View style={styles.emptyListContainer}>
        <View style={{height: Dimensions.get('screen').height * 0.3}} />
        <Text style={styles.emptyList}>HOPLA!</Text>
        <Text style={styles.emptyList}>Vyzerá to, že tu nie sú žiadne vtipy.</Text>
        <Text style={styles.emptyList}>Toto neni sranda!</Text>
      </View>
      
    )
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
    backgroundColor: 'black',
  },
  emptyListContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000',
    justifyContent: 'space-evenly',
  },
  emptyList: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  }
});
