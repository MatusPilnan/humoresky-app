import React from 'react';
import {
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

import JokeCard from '../components/JokeCard';
import MyJokeCard from '../components/MyJokeCard';
import HeaderButton from '../components/HeaderButton';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Humoresky 😂😂😂",
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
    this.state = {
      jokes: [], 
      refreshing: true,
      fetching: false,
      page: 1,
      pages: 1
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
        onEndReached={() => this.onFetchMore()}
        onEndReachedThreshold={0.2}
        refreshing={this.state.refreshing}
        keyExtractor={(item, index) => String(item.id)}
        renderItem={({item}) => <JokeCard joke={transform(item)} />}
        ListEmptyComponent={() => this.emptyList()}
        ListFooterComponent={((this.state.fetching && this.state.pages > this.state.page)|| this.state.refreshing) ? <ActivityIndicator size='large' color='white' /> : null}
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
        page: 1,
        pages: json.last_page
      })
      return json.data
    })
    .catch((error) => {
      //console.debug(error)
      this.setState({
        refreshing: false,
      })
    })
  }

  getMoreJokes() {
    return fetch(Expo.Constants.manifest.extra.server + '/api/vtipy?page=' + (this.state.page + 1))
    .then((response) => response.json())
    .then((json) => {
      if (json.data.length > 0) {
        this.setState({
          jokes: this.state.jokes.concat(json.data),
          page: this.state.page + 1,
          fetching: false,
          pages: json.last_page
        })
      }
      this.setState({
        fetching: false
      })
    })
    .catch((error) => {
      //console.debug(error)
      this.setState({
        fetching: false,
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
        {/* <ActivityIndicator size="large" color="white" /> */}
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

  onFetchMore() {
    if (this.state.fetching || (this.state.pages <= this.state.page)) return
    this.setState({fetching: true}, function () { this.getMoreJokes() })
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
