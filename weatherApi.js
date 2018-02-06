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
          coord: {
            latitude: json.coord.lat,
            longitude: json.coord.lon
          },
          sys: json.sys,
          description: json.weather[0].main,
          icon: json.weather[0].icon ? "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png" : "https://openweathermap.org/img/w/09d.png"
        }
      })
    })
}

export function getRegionForCoordinates(points) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);
  console.log(deltaX, deltaY)
  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX ? deltaX : 0.09,
    longitudeDelta: deltaY ? deltaY : 0.09
  };
}