const rootRrl = "http://api.openweathermap.org/data/2.5/weather?appid=c55ec823be46f88fbcf55db70cc8e772&units=imperial"

export const fetchWeather = (lat, lon) => {
  const url = rootRrl + "&lat=" + lat + "&lon=" + lon;
  console.log(url);

  return fetch(url)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      return ({
        location: json.name,
        temp: Math.round(json.main.temp),
        weather: {
          sys: json.sys,
          description: json.weather[0].main,
          icon: json.weather[0].icon ? "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png" : "https://openweathermap.org/img/w/09d.png"
        }
      })
    })
}