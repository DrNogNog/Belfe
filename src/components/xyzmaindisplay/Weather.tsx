import { useEffect, useState } from 'react';
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
  const baseUrl = 'https://raw.githubusercontent.com/maxbethge/MMM-AccuWeatherForecastDeluxe/master/icons/4m';
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
  const [cityId, setCityId] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [latCoords,setlatCoords] = useState<string | null>(null);
  const [lonCoords,setlonCoords] = useState<string | null>(null);
  
  useEffect(() => {
    const getLocation = async () => {
      try {
        // Use ip-api service to get user's location based on IP
        const locationResponse = await axios.get('http://ip-api.com/json/?fields=status,country,regionName,lat,lon');
        const location = locationResponse.data;
        if (location.status === 'success') {
          setCityName(location.regionName); // Set the city name based on IP location
          setlatCoords(location.lat);
          setlonCoords(location.lon);
          // Assign City ID based on detected city
          let cityId;
          if (location.regionName === 'New York') {
            cityId = '5128581'; // New York City
          } else if (location.regionName === 'London') {
            cityId = '2643743'; // London City
          } else {
            cityId = null; // If city is not in our predefined list
          }

          setCityId(cityId); // Update state with the city ID
        } else {
          console.error('Failed to get location data');
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (!cityId) return; // Exit if city ID is not yet available
    const API_KEY = 'b2e58039f40957506b9ed2dcb9faa839';

    const fetchWeather = async () => {
      try {
        const [currentResponse, forecastResponse] = await Promise.all([
          axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`),
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}&units=metric`)
        ]);
      
        // Get today's date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);
      
        // Extract daily forecasts for the next 5 days
        const uniqueDays = new Set();
        const dailyForecasts = forecastResponse.data.list
          .filter((item: any) => {
            const forecastDate = new Date(item.dt * 1000);
            forecastDate.setHours(0, 0, 0, 0);
            
            // Check if the forecast date is after or equal to today
            const isFutureDate = forecastDate >= today;
      
            // Check if it's a new day and track it
            if (isFutureDate && !uniqueDays.has(forecastDate.toDateString())) {
              uniqueDays.add(forecastDate.toDateString());
              return true;
            }
      
            return false;
          })
          .slice(0, 5);
      
        setWeather({
          location: cityName || "Unknown Location",
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
      
        console.log(currentResponse);
        console.log(forecastResponse);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
      
    };
    fetchWeather();
  }, [cityId, cityName]);

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
      className="text-left p-6 absolute top-4 right-4"
    >
      {/* Current Weather */}
    <div className="mb-8 text-center flex items-center">
      <div className="text-2xl font-light mb-2 mr-4">{weather.location}</div>
      <div className="text-6xl mr-4">
        <img src={getWeatherIcon(weather.current.icon)} alt="Current weather" className="w-24 h-24 inline-block mb-2" />
      </div>
      <div className="flex flex-col items-start items-center">
        <div className="text-4xl font-light">{weather.current.temp}°</div>
        <div className="text-sm text-gray-400">{`Feels like ${weather.current.feelsLike}°`}</div>
      </div>
    </div>



      {/* Next 5 Days Forecast */}
      <div className="flex justify-between">
        {weather.forecast.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-sm mb-2">{day.day}</div>
            <img
              src={getWeatherIcon(day.icon)}
              alt={`${day.day} weather`}
              className="w-10 h-10 mx-auto mb-2"
            />
            <div className="text-sm">
              <span>{day.tempHigh}°</span> / <span className="text-gray-500">{day.tempLow}°</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
