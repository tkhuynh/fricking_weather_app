import React, {Component} from 'react';
import { 
  AppRegistry,
  Text,
  StyleSheet,
  View,
  StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './weatherApi'

class App extends Component {

  componentDidMount() {
    this.getLocation()
    fetchWeather(-21,28)
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => console.log(posData),
      (error) => console.log(error),
      {timeout: 10000}
    )
  }
  render() {
    return(
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
          <Icon name={'ios-sunny'} size={100} color={'white'}></Icon>
          <Text style={styles.temp}>24°</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Build a <Text style={{color: 'red'}}>Fucking</Text> Weather App</Text>
          <Text style={styles.subtitle}>Let's Make it Rain</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    flex: 1,
    alignItems: 'center',
  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 45,
    color: 'white'
  },
  body: {
    justifyContent: 'flex-end', 
    flex: 6,
    alignItems: 'flex-start',
    margin: 10
  },
  title: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 78,
    color: 'white'
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
    color: 'white',
    marginBottom: 5
  }
})

AppRegistry.registerComponent('fuckingWeather', () => App);
