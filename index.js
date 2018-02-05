import React, {Component} from 'react';
import { 
  AppRegistry,
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './weatherApi'

const iconNames = {
  clear: 'md-sunny',
  rain: 'md-rainy',
  thunderstorm: 'md-thunderstorm',
  clouds: 'md-cloudy',
  snow: 'md-snow',
  drizzle: 'md-umbrella',
  haze: 'md-flash'
}

class App extends Component {

  componentWillMount() {
    this.setState({hideStatusBar: false})
  }

  componentDidMount() {
    this.getLocation()
    // fetchWeather(-21,28).then(res => console.log(res))
    // setInterval(() => {
    //     this.setState({hideStatusBar: !this.state.hideStatusBar})
    //   }, 1000
    // )
  }
  // <Icon name={this.state.weather ? iconNames[this.state.weather.description.toLowerCase()] : iconNames['clear']} size={100} color={'white'}></Icon>
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
        .then(res => this.setState({
          temp: res.temp,
          weather: res.weather
        })),
      (error) => console.log(error),
      {timeout: 10000}
    )
  }
  render() {
    return(
      <View style={styles.container}>
        <StatusBar hidden={this.state.hideStatusBar}/>
        <View style={styles.header}>
          <Image source={{uri: this.state.weather && this.state.weather.icon ? this.state.weather.icon : 'https://openweathermap.org/img/w/09d.png'}} style={{width: 75, height: 75}}/>
          <Text style={styles.temp}>{this.state.temp ? this.state.temp : 0}°</Text>
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
