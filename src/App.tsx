import React, { useEffect, useRef } from 'react';
import './App.css';
import CityWeather from './CityWeather';
import Input from './Input';
import clouds from './Clouds.jpg'
import rain from './rain.jpg'
import snow from './snow.jpg'
import clear from './clear.jpg'
import thunderstorm from './thunderstorm.jpg'
import haze from './haze.jpg'
import mist from './mist.jpg'
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'

const libraries: ("places")[] = ['places'];

function App() {

  const [city, setCity] = React.useState('London');
  const [country, setCountry] = React.useState('GB');
  const [temperature, setTemperature] = React.useState(0);
  const [input, setInput] = React.useState('LONDON')
  const [description, setDescription] = React.useState('')
  const [windSpeed, setWindSpeed] = React.useState(0)
  const [srcImg, setSrcImg] = React.useState('')
  const [humidity, setHumidity] = React.useState(0)
  const [pressure, setPressure] = React.useState(0)
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(0);
  const [feelsLike, setFeelsLike] = React.useState(0)
  const [main, setMain] = React.useState('')
  const [lat, setLat] = React.useState(51.51)
  const [lon, setLon] = React.useState(-0.13)
  const [time, setTime] = React.useState(new Date().toLocaleTimeString())
  const [forecast, setForecast] = React.useState<any>([])
  const [visibility, setVisibility] = React.useState(0)
  const [gust, setGust] = React.useState(0)
  const [direction, setDirection] = React.useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY || '',
    libraries,
  })


  const current = new Date();
  const date = current.toLocaleDateString();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[current.getDay()];


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  let source = '';
  switch (main) {
    case 'Clouds':
      source = clouds;
      break;
    case 'Rain':
      source = rain;
      break;
    case 'Snow':
      source = snow;
      break;
    case 'Clear':
      source = clear;
      break;
    case 'Thunderstorm':
      source = thunderstorm;
      break;
    case 'Haze':
      source = haze;
      break;
    case 'Mist':
      source = mist;
      break;
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();


    async function getWeather() {
      //const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=47625d659a70afdd212d81b1d245bb54`)
      //const responseGeo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=47625d659a70afdd212d81b1d245bb54`)
      const responseGeo = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`)

      const dataGeo = await responseGeo.json();
      console.log("dataGeo: ", dataGeo)
      if (dataGeo.status !== 'OK') {
        alert('Location not found');
        return;
      } else {
        setLat(dataGeo.results[0].geometry.location.lat);
        setLon(dataGeo.results[0].geometry.location.lng);
      }

      console.log("lat: ", lat)
      console.log("lon: ", lon)


      const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`)

      const data = await responseWeather.json();

      const dayForecast = data.list.filter((item: any) => item.dt_txt.includes('12:00:00'));
      setForecast(dayForecast);
      setCity(data.city.name);
      setCountry(data.city.country)
      setTemperature(data.list[0].main.temp);
      setDescription(data.list[0].weather[0].description)
      setWindSpeed(data.list[0].wind.speed)
      setSrcImg(data.list[0].weather[0].icon)
      setHumidity(data.list[0].main.humidity)
      setPressure(data.list[0].main.pressure)
      setVisibility(data.list[0].visibility)
      setGust(data.list[0].wind.gust)
      setDirection(data.list[0].wind.deg)
      setMin((data.list[0].main.temp_min).toFixed(0))
      setMax((data.list[0].main.temp_max).toFixed(0))
      setFeelsLike(data.list[0].main.feels_like);
      setMain(data.list[0].weather[0].main)

      // console.log("forecast initial: ", data)
    } getWeather()
  }


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
    console.log("input: ", input)
  }

  useEffect(() => {
    async function getWeather() {
      //const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=47625d659a70afdd212d81b1d245bb54`)
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`)

      const data = await response.json();

      setForecast(data.list.filter((item: any) => item.dt_txt.includes('12:00:00')));

      // setForecast(data.list)
      setCity(data.city.name);
      setTemperature(data.list[0].main.temp);
      setCountry(data.city.country)
      setDescription(data.list[0].weather[0].description)
      setWindSpeed(data.list[0].wind.speed)
      setSrcImg(data.list[0].weather[0].icon)
      setHumidity(data.list[0].main.humidity)
      setPressure(data.list[0].main.pressure)
      setVisibility(data.list[0].visibility)
      setGust(data.list[0].wind.gust)
      setDirection(data.list[0].wind.deg)
      setMin((data.list[0].main.temp_min).toFixed(0))
      setMax((data.list[0].main.temp_max).toFixed(0))
      setFeelsLike(data.list[0].main.feels_like);
      setMain(data.list[0].weather[0].main)


      // console.log("forecast: ", data)


    } getWeather()
  }, [lat, lon, input])

  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      console.log(places)
      if (places && places.length > 0) {
        const place = places[0];
        setInput(place.formatted_address || place.name || '');
      }
    }
  };

  return (


    <div className="App">

      <div className="background">
        <img src={source} alt="clouds" />
      </div>
      {isLoaded &&
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={onPlacesChanged}

        >
          <Input handleChange={handleChange} ref={inputRef} handleClick={handleClick} />
        </StandaloneSearchBox>
      }
      <CityWeather className='weather-container' city={city} country={country} temperature={Math.floor(temperature)} forecast={forecast} celsius='°C' visibility={visibility} gust={gust} direction={direction} min={min} max={max} feelsLike={Math.floor(feelsLike)} description={description} windSpeed={windSpeed} srcImg={`https://openweathermap.org/img/wn/${srcImg}@2x.png`} day={day} time={time} date={date} humidity={humidity + ` %`} pressure={pressure + ` hPa`}
      />
    </div>

  );
}

export default App;
