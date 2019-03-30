import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation'

class JokeCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { joke: props.joke }
  }

  render() {
    return (
      <TouchableOpacity onPress={() => { /*this.props.navigation.navigate(DETAIL VTIPU, {joke: this.state.joke})*/ } }>
        <View style={styles.container}>
          <Image
            style={{ width: 70, height: 70, marginRight: 15 }}
            source={(typeof this.state.joke.picture !== "undefined" && this.state.joke.picture != null) ? { uri: this.state.joke.picture } : require('../assets/images/lol-512.png')}
          />
          <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text numberOfLines={1} style={styles.title}>{this.state.joke.title}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={styles.text}>{String(this.state.joke.rating)}</Text>
                <Image source={require('../assets/images/star.png')} />
              </View>
            </View>
            <Text numberOfLines={2} style={styles.text}>{this.state.joke.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(JokeCard)

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
  }
})