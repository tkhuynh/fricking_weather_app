const rootRrl = "http://api.openweathermap.org/data/2.5/weather?appid=c55ec823be46f88fbcf55db70cc8e772"

export const fetchWeather = (lat, lon) => {
  const url = rootRrl + "&lat=" + lat + "&lon=" + lon;
  console.log(url);

  fetch(url).then(res => console.log(res))
}