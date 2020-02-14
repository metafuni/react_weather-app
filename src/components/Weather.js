import React, { Component } from 'react';

//Import Background Images
import cloudy from '../img/cloudy.jpg';
import sunny from '../img/sunny.jpg';
import mist from '../img/mist.jpg';
import overcast from '../img/overcast.jpg';
import rainy from '../img/rainy.jpg';
import snow from '../img/snow.jpg';
import thunder from '../img/thunder.jpg';
import night from '../img/night.jpg';
import bg from '../img/bg.jpg';

class Weather extends Component {
    componentDidUpdate() {

        //Set Weather Icons
        if (this.props.weather.icon) {
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${this.props.weather.icon}@2x.png`;
        }

        //Set Weather Background
        const body = document.querySelector('body');
        switch (this.props.weather.icon) {
            case "01d":
                body.style.backgroundImage = `url(${sunny})`;
                break;
            case "02d":
                body.style.backgroundImage = `url(${overcast})`;
                break;
            case "03d":
                body.style.backgroundImage = `url(${overcast})`;
                break;
            case "04d":
                body.style.backgroundImage = `url(${cloudy})`;
                break;
            case "09d":
                body.style.backgroundImage = `url(${rainy})`;
                break;
            case "10d":
                body.style.backgroundImage = `url(${rainy})`;
                break;
            case "11d":
                body.style.backgroundImage = `url(${thunder})`;
                break;
            case "13d":
                body.style.backgroundImage = `url(${snow})`;
                break;
            case "50d":
                body.style.backgroundImage = `url(${mist})`;
                break;
            case "01n":
            case "02n":
            case "03n":
            case "04n":
            case "09n":
            case "10n":
            case "11n":
            case "13n":
            case "50n":
                body.style.backgroundImage = `url(${night})`;
                break;
            case undefined:
                body.style.backgroundImage = `url(${bg})`;
                break;
            default:
        };

        //Set Wind Direction Icon Angle
        if (this.props.weather.wind_direction && this.props.weather.city && this.props.weather.country) {
            const rotationAngle = this.props.weather.wind_direction;
            const rotationFraction = rotationAngle / 360;
            // Alternative:
            // document.getElementById('wind-direction-icon').style.transform = `rotate(calc(${rotationAngle})*1deg)`;
            document.getElementById('wind-direction-icon').style.setProperty('--rotation', rotationAngle);

            //Set Wind Direction NESW
            const nesw = document.getElementById('NESW');
            if (rotationFraction < 0.25) {
                nesw.innerHTML = "NE: ";
            } else if (rotationFraction > 0.25 && rotationFraction < 0.5) {
                nesw.innerHTML = "SE: ";
            } else if (rotationFraction > 0.5 && rotationFraction < 0.75) {
                nesw.innerHTML = "SW: ";
            } else if (rotationFraction > 0.75 && rotationFraction < 1) {
                nesw.innerHTML = "NW: ";
            } else if (rotationFraction === 0 || rotationFraction === 1) {
                nesw.innerHTML = "N: ";
            } else if (rotationFraction === 0.25) {
                nesw.innerHTML = "E: ";
            } else if (rotationFraction === 0.5) {
                nesw.innerHTML = "S: ";
            } else if (rotationFraction === 0.75) {
                nesw.innerHTML = "W: ";
            };
        } else if (!this.props.weather.wind_direction && this.props.weather.city && this.props.weather.country) {
            document.getElementById('wind-bckup-icon').innerHTML = "wind: ";
        };

        //Remove description text after any update
        if (this.props.weather.city && this.props.weather.country) {
            document.getElementById('ww-description').style.display = "none";
        };

        //Set Timezone GMT
        if (this.props.weather.timezone && this.props.weather.city && this.props.weather.country) {
            document.getElementById('timezone-p').style.visibility = "visible";
            const time = this.props.weather.timezone;
            return time >= 0 ? document.getElementById('timezoneGMT').innerText = " +" : document.getElementById('timezoneGMT').innerText = "";
        };
    };
    
    render() {
        return (
                <div id="weather-info-div">
                <div id="weather-info-left" className="info">
                    {this.props.weather.city && this.props.weather.country && <p id="location-p">{this.props.weather.city}, {this.props.weather.country}</p>}
                    {this.props.weather.timezone !== 0 && this.props.weather.timezone !== undefined && <p id="timezone-p"><i className="fas fa-globe"></i> GMT<span id="timezoneGMT"></span>{this.props.weather.timezone}</p>}
                    {this.props.weather.icon && <img src="" alt="" id="weather-icon"></img>}
                    {this.props.weather.description && <p>{this.props.weather.description}</p>}
                </div>
                
                <div id="weather-info-mid" className="info">
                    {this.props.weather.min_temperature && <p id="min-temp">{Math.floor(this.props.weather.min_temperature)}<span id="small-celcius">&#8451;</span></p>}
                    {this.props.weather.temperature && <p id="temp">{Math.floor(this.props.weather.temperature)} &#8451;</p>}
                    {this.props.weather.max_temperature && <p id="max-temp">{Math.floor(this.props.weather.max_temperature)}<span id="small-celcius">&#8451;</span></p>}
                </div>
                <div id="weather-info-right" className="info">
                    {this.props.weather.wind_direction && <p id="wind-direction-p"><i className="fas fa-arrow-up fa-3x" id="wind-direction-icon"></i></p>}
                    {this.props.weather.wind_speed && <p id="wind-speed-p"><span id="NESW"></span><span id="wind-bckup-icon"></span>{this.props.weather.wind_speed}<span id="small-celcius">mph</span></p>}
                    {this.props.weather.humidity && <p><i className="fas fa-water"></i> {this.props.weather.humidity}%</p>}
                </div>
                {this.props.weather.error && <p id="error-message"><i className="fas fa-exclamation-triangle"></i> {this.props.weather.error}</p>}
            </div>
        )
    }
};

export default Weather;
