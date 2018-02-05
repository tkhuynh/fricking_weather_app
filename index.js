import React, {Component} from 'react';
import { 
  AppRegistry,
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
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

function getTimeFromMilliseconds(milliseconds) {
  let time = new Date(milliseconds * 1000)
  let hour = time.getHours()
  let min = time.getMinutes()
  let ap = hour > 11 ? 'PM' : 'AM'
  hour =  hour > 12 ? hour - 12 : hour 
  min = min < 10 ? "0" + min : min
  return hour + ":" + min + ap
}

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      visible: true,
      overlayColor: 'black'
    };
  }

  componentWillMount() {
    this.setState({
      hideStatusBar: false
    })
  }

  componentDidMount() {
    this.getLocation()
  }
  // <Icon name={this.state.weather ? iconNames[this.state.weather.description.toLowerCase()] : iconNames['clear']} size={100} color={'white'}></Icon>
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
        .then(res => this.setState({
          visible: false,
          location: res.location,
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
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <StatusBar hidden={this.state.hideStatusBar}/>
        <View style={styles.top}>
          <Text style={styles.city}>{this.state.location ? this.state.location : '--'}</Text>
        </View>
        <View style={styles.header}>
          <Image source={{uri: this.state.weather && this.state.weather.icon ? this.state.weather.icon : 'https://openweathermap.org/img/w/09d.png'}} style={{width: 75, height: 75}}/>
          <Text style={styles.temp}>{this.state.temp ? this.state.temp : '--'}°</Text>
        </View>
        <View style={styles.sun}>
          <Text style={styles.sunText}>Sunrise: {this.state.weather && this.state.weather.sys && this.state.weather.sys.sunrise ? getTimeFromMilliseconds(this.state.weather.sys.sunrise) : '--'}</Text>
          <Text style={styles.sunText}> Sunset: {this.state.weather && this.state.weather.sys && this.state.weather.sys.sunset ? getTimeFromMilliseconds(this.state.weather.sys.sunset) : '--'}</Text>
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
  top: {
    justifyContent: 'center', 
    flex: 1,
    alignItems: 'center',
  },
  city: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 30,
    color: 'white'
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
  sun: {
    alignItems: 'flex-start',
    flex: 1,
    alignItems: 'center',
  },
  sunText: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 22,
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
