import axios from 'axios'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const api_key = process.env.REACT_APP_API_KEY
const weatherurl = 'https://api.openweathermap.org/data/2.5/weather?'

const search = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const weatherinfo = (city) => {
    const request = axios.post(`${weatherurl}q=${city}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default {search, weatherinfo}