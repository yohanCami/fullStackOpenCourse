import { useState, useEffect } from 'react'
import axios from 'axios';

const ShowCountry = ({country}) => {

  const [weatherData, setWeatherData] = useState({})
  const [temp, setTemp] = useState(0)
  const [windCdir, setWindCdir] = useState("")
  const [windSpd, setWindSpd] = useState(0)

  const apiUrl = 'https://api.weatherbit.io/v2.0/current';
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; 
  // const countryName = country.name.common;
  const capitalName = country.capital[0]

  

  const url = `${apiUrl}?key=${apiKey}&city=${capitalName}`;

  useEffect(() => {
    console.log('Effect del clima');
    console.log(url);

    axios
    .get(url)
    .then(response => {
      // console.log(response.data);
      setWeatherData(response.data.data[0])
      
    })
  }, [])

  useEffect(() => {
    console.log(weatherData.temp);

    setTemp(weatherData.temp)
    setWindCdir(weatherData.wind_cdir)
    setWindSpd(weatherData.wind_spd)
  }, [weatherData])


  
  return(
    <>
      <h2>{ country.name.common }</h2>

      <p>capital {country.capital}</p>
      <p>populaton {country.population}</p>

      <h3>languages</h3>

      <ul>
        
      {Object.keys(country.languages).map(key => (
          <li key={key}>
           {country.languages[key]}
          </li>
        ))}

      </ul>

      <img src={country.flags['png']} alt={ country.name.common } />

      <h3>Weather in {capitalName}</h3>

      <strong>temperature:</strong> {temp}  Celcius <br />

      <strong>wind:</strong> {windSpd} mph direction {windCdir} <br />

      <strong>Note:</strong> I had problems using the recommended API. Instead I used https://www.weatherbit.io, my free account will only work for one month
    </>
  )
}

const SeeCountries = ({country}) => {

  const [seeMore, setSeeMore] = useState(false)

  return(
    <>
      <br />{country.name.common} <button onClick={() => setSeeMore(!seeMore)}>{seeMore ? 'ocultar' : 'show'}</button>

      {
        seeMore
        ?
          <ShowCountry country={country} />

        :
          <div></div>
      }
    </>
  )
}

const Filter = ({countries}) => {

  // console.log(countries);

  return(
    <>
      {
      (countries.length > 10) | (countries.length === 0)
      ?
        <p>Too many matches, specify another filter</p>
      :
        countries.length === 1
        ?
          <ShowCountry country={countries[0]} />
        :
          countries.map((country, index) => <SeeCountries country={country} key={index}/> )
       }
    </>
  )
}




function App() {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('Entró en el effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('Promesa completa')
        setAllCountries(response.data)
      })

  }, [])

  const handleFilterChange = (event) => {

    setFilter(event.target.value)    
  }

  useEffect(() => {
    const newCountries = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    setCountries(newCountries);
  }, [allCountries, filter]);

  // console.log(countries);

  return (
    <>
      <label>find countries</label><input value={filter} onChange={handleFilterChange} type="text" />
    
      <Filter countries={countries}/>
    </>
  )
}

export default App
