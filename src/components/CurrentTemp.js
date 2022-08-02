import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { RiLoader2Line } from 'react-icons/ri'
import Hyphenated from 'react-hyphen';

const CurrentTemp = ({ openWeatherApiKey }) => {
    const [weatherData, setweatherData] = useState();

    useEffect(() => {

        fetchData();

        async function fetchData() {
            setweatherData(await getWeatherData(openWeatherApiKey));
        }

      }, []);

    let message = <RiLoader2Line className='load-spinner' />;
    let icon = null;
    if(weatherData) {
        let iconUrl = `https://openweathermap.org/img/wn/${ weatherData.weather[0].icon }@2x.png`;
        let location = <Hyphenated>{weatherData.name}</Hyphenated>;

        message = 
        <h3 className='weather-text'>      
            <strong>{ location }</strong> <strong style={{color: '#2B5353'}}>{ Math.round(weatherData.main.temp) }&deg;C</strong>
        </h3>;

        icon = <img className='weather-icon' src={iconUrl} alt="Wetter Icon" />;
 
    }
    else {
        message = null;
    }

    return (
        <div className='weather-message'>
            { icon }
            { message }    
        </div>
    );
}

const getPositionPromise = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const getWeatherData = async (openWeatherApiKey) => {
    const position = await getPositionPromise();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let result = JSON.parse(await makeRequest(latitude, longitude, openWeatherApiKey));
    return result;
}


const makeRequest = (latitude, longitude, openWeatherApiKey) => {
    return new Promise((resolve, reject) => {    
        // latitude = 48.210033;
        // longitude = 16.363449;
        let xhr = new XMLHttpRequest();
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}&units=metric&lang=de`;

        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}



export default CurrentTemp;