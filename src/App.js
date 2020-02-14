import React from 'react';

import './App.css';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = 'a01cefc7106e1d7afdb0d0742f2190f4';

class App extends React.Component {
    state = {
        temperature: undefined,
        min_temperature: undefined,
        max_temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        pressure: undefined,
        description: undefined,
        icon: undefined,
        timezone: undefined,
        wind_direction: undefined,
        wind_speed: undefined,
        error: undefined
    };
    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();

        if (city && country && api_call.status === 200) {
            this.setState({
                temperature: data.main.temp,
                min_temperature: data.main.temp_min,
                max_temperature: data.main.temp_max,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                timezone: data.timezone/3600,
                wind_direction: data.wind.deg,
                wind_speed: data.wind.speed,
                error: ''
            });
        } else {
            this.setState({
                temperature: undefined,
                min_temperature: undefined,
                max_temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                pressure: undefined,
                description: undefined,
                icon: undefined,
                timezone: undefined,
                wind_direction: undefined,
                wind_speed: undefined,
                error: 'Please enter valid values!'
            });
            
        }
    };
    render() {
        return (
            <div>
                <Titles />
                <Form getWeather={this.getWeather} />
                <Weather weather={this.state} />
            </div>
        );
    }
};

export default App;