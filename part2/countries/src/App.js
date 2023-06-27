import { useEffect, useState } from 'react'
import Fetch from "./components/Fetch";
import Display from "./components/Display";
import CountryList from "./components/CountryList";
import Weather from './components/Weather';
import service from "./services/service";

const App = () => {
  const [display, setDisplay] = useState([])
  const [lang, setLang] = useState([])
  const [prompt, setPrompt] = useState(null)
  const [store, setStore] = useState([])
  const [list, setList] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {
    service
      .search()
      .then(response => {
        setStore(response)
      })
  }, [])

  //reset fields
  const reset1 = () => {
    setDisplay([])
    setLang([])
    setWeather([])
  }

  const reset2 = () => {
    setList([])
    setPrompt(null)
  }

  const handleFetch = (event) => {
    event.preventDefault()
    fetching(event.target.value)
  }

  //fetch weather info
  const weatherinfo = (city) => {
    service
      .weatherinfo(city)
      .then(response => {
        const weath = {
          wetitle: `Weather in ${response.name}`,
          temp: `temperature ${response.main.temp} Celsius`,
          wind: `wind ${response.wind.speed} m/s`,
          png: `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
        }
        setWeather(weath)
      })
  }

  //pass info for display
  const disinfo = (inf) => {

    //reset other values
    reset2()

    // create a new object
    const newCountry = {
      name: inf.name.common,
      capital: `capital ${inf.capital}`,
      area: `area ${inf.area}`,
      flag: inf.flags.png,
      id: display.length + 1,
      ltitle: "languages:",
    }

    // setting city for weather info
    weatherinfo(inf.capital)

    // setting display
    setDisplay(newCountry)

    //setting language info
    setLang(Object.values(inf.languages))
  }

  // displaying selected country's info
  const handleSelection = (lst) => {
    const names = (store.filter(country => country.name.common.toUpperCase() === lst.toUpperCase()))[0]
    disinfo(names)
  }

  const fetching = (query) => {

    if (query.length > 0) {

      //filter countries based on query match
      const names = (store.filter(country => country.name.common.toUpperCase().includes(query.toUpperCase())))

      if (names.length === 1) {

        disinfo(names[0])

      } else if (names.length >= 10) {

        setList([])
        setPrompt('Too many matches, specify another filter')
        reset1()

      } else if (names.length < 10 && 1 < names.length) {

        //filter names of countries for listing
        const listNames = names.map(country => country.name.common)
        setList(listNames)
        setPrompt(null)
        reset1()
      }

    } else {
      reset1()
      reset2()
    }
  }

  return (
    <div>
      <Fetch handleFetch={handleFetch} />
      <CountryList list={list} selection={handleSelection} />

      {prompt}

      <div>
        <Display content={display} lang={lang} />
      </div>

      <Weather info={weather} />
    </div>
  )
}

export default App
