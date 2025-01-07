import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface WeatherData {
  location: string;
  current: {
    temp: number;
    feelsLike: number;
    icon: string;
  };
  forecast: Array<{
    day: string;
    tempHigh: number;
    tempLow: number;
    icon: string;
  }>;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getWeatherIcon = (iconCode: string) => {
  // Base URL for the weather icons
  const baseUrl = 'https://raw.githubusercontent.com/maxbethge/MMM-AccuWeatherForecastDeluxe/master/icons/4m';
  
  // Map OpenWeather codes to AccuWeather icon names
  const iconMap: { [key: string]: string } = {
    '01d': 'clear-day',
    '01n': 'clear-night',
    '02d': 'partly-cloudy-day',
    '02n': 'partly-cloudy-night',
    '03d': 'cloudy',
    '03n': 'cloudy',
    '04d': 'cloudy',
    '04n': 'cloudy',
    '09d': 'rain',
    '09n': 'rain',
    '10d': 'rain',
    '10n': 'rain',
    '11d': 'thunderstorm',
    '11n': 'thunderstorm',
    '13d': 'snow',
    '13n': 'snow',
    '50d': 'fog',
    '50n': 'fog'
  };

  const iconName = iconMap[iconCode] || 'cloudy';
  return `${baseUrl}/${iconName}.svg`;
};

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const API_KEY = 'b2e58039f40957506b9ed2dcb9faa839';
  const CITY_ID = '2778067'; // Graz, Austria

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const [currentResponse, forecastResponse] = await Promise.all([
          axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric`),
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&appid=${API_KEY}&units=metric`)
        ]);

        const dailyForecasts = forecastResponse.data.list.filter((item: any) => 
          new Date(item.dt * 1000).getHours() === 12
        ).slice(0, 5);

        setWeather({
          location: 'Graz',
          current: {
            temp: Math.round(currentResponse.data.main.temp),
            feelsLike: Math.round(currentResponse.data.main.feels_like),
            icon: currentResponse.data.weather[0].icon
          },
          forecast: dailyForecasts.map((day: any) => ({
            day: DAYS[new Date(day.dt * 1000).getDay()],
            tempHigh: Math.round(day.main.temp_max),
            tempLow: Math.round(day.main.temp_min),
            icon: day.weather[0].icon
          }))
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
      className="text-left p-6"
    >
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light mb-1">{weather.location}</h2>
          <div className="text-sm text-gray-400">
            Feels like {weather.current.feelsLike}°
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={getWeatherIcon(weather.current.icon)}
            alt="Current weather"
            className="w-16 h-16"
          />
          <div className="text-4xl font-light">
            {weather.current.temp}°
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="grid grid-cols-5 gap-4">
        {weather.forecast.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-sm mb-2">{day.day}</div>
            <img
              src={getWeatherIcon(day.icon)}
              alt={`${day.day} weather`}
              className="w-8 h-8 mx-auto mb-2"
            />
            <div className="flex justify-center gap-2 text-sm">
              <span>{day.tempHigh}°</span>
              <span className="text-gray-500">{day.tempLow}°</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}