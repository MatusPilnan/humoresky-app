import React from 'react';
import {
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  
} from 'react-native';
import { NavigationEvents } from 'react-navigation'

import MyJokeCard from '../components/MyJokeCard';
import HeaderButton from '../components/HeaderButton';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: "Moje vtipy 😂😂😂",
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
        pages: 1,
        offline: 0
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
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => <MyJokeCard joke={transform(item)} />}
          ListHeaderComponent={
          <Text style={{color: 'white', textAlign: 'center'}}>
            <NavigationEvents onDidFocus={() => this.onRefresh()} />
            { this.state.offline == 0 ? '': this.awaitingUploadMsg() }
          </Text>
        }
          ListEmptyComponent={() => this.emptyList()}
          ListFooterComponent={((this.state.fetching && this.state.pages > this.state.page)|| this.state.refreshing) ? <ActivityIndicator size='large' color='white' /> : null}
        />
      );
    }
    
    getJokes() {
      AsyncStorage.getItem('offlineJokes').then((offlineJokes) => {
        console.debug(offlineJokes)
        if (offlineJokes != null) {
          offlineNumber = JSON.parse(offlineJokes).length
        } else {
          offlineNumber = 0
        }
        this.setState({
          jokes: [], 
          refreshing: true,
          fetching: false,
          page: 1,
          pages: 1,
          offline: offlineNumber
        })
      }).catch(() => {
        console.debug('nejde nacitat z AS')
      })
      AsyncStorage.getItem('apiToken').then((apiToken) => {
        return fetch(Expo.Constants.manifest.extra.server + '/api/moje_vtipy', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ apiToken
          }})
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
          this.setState({
            refreshing: false,
          })
        })
      })
    }
  
    getMoreJokes() {
      AsyncStorage.getItem('apiToken').then((apiToken) => {
        return fetch(Expo.Constants.manifest.extra.server + '/api/moje_vtipy?page=' + (this.state.page + 1), {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ apiToken
          }})
        .then((response) => response.json())
        .then((json) => {
          if (json.data.length > 0) {
            this.setState({
              jokes: this.state.jokes.concat(json.data),
              page: this.state.page + 1,
              fetching: false
            })
          }
          this.setState({
            fetching: false
          })
        })
        .catch((error) => {
          console.debug(error)
          this.setState({
            fetching: false,
          })
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

    awaitingUploadMsg() {
      if (this.state.offline < 1) return ''
      if (this.state.offline == 1) return this.state.offline + ' vtip čaká na nahratie.'
      if (this.state.offline <= 4) return this.state.offline + ' vtipy čakajú na nahratie.'
      else return this.state.offline + ' vtipov čaká na nahratie.'   
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