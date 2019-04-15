import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import HeaderButton from '../components/HeaderButton';

export default class JokeDetailScreen extends React.Component {
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
        this.state = initialState
        this.state.joke = this.props.navigation.getParam('joke', initialState.joke)
    }
  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{this.state.joke.title}</Text>
            <Image
                style={styles.image}
                resizeMode= "contain"
                source={(typeof this.state.joke.picture !== "undefined" && this.state.joke.picture != null && this.state.joke.picture != 'data:image/png;base64,') ? { uri: this.state.joke.picture } : require('../assets/images/lol-512.png')}
            />
            <View style={{/* flex: 1,*/ /*flexDirection: 'row',*/ /*justifyContent: 'space-between'*/ }}>
                <View style={styles.rating}>
                  <Text style={styles.text}>{String(this.state.joke.rating)}</Text>
                  <Image source={require('../assets/images/star.png')} />
              </View>
            </View>
            <Text style={styles.text}>{this.state.joke.description}</Text>
            <Text style={styles.text}>{this.state.joke.body}</Text>
          </View>
        </View>
      );
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
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    innerContainer: {
      flex: 1,
      margin: 5,
      padding: 5,
    },
    image: {
      flex: 1,
      width: '100%',
      height: null,
      borderColor: 'gray',
      borderWidth: 2,
      borderRadius: 5
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
    },
    rating: {
      flexDirection: 'row',
    },
    text: {
      color: 'white',
      fontSize: 20,
    },
    grayBorder: {
      borderColor: 'gray',
      borderWidth: 2,
    }
  });