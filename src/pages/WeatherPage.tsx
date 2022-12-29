import {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {IForecast, IForecastResponse, IWeather, IWeatherResponse} from "../@types";
import {Card} from "../components/Card";

import axios from "axios";
import {Navigation} from "swiper";



export const WeatherPage = () => {
    const [weather, setWeather] = useState<IWeather | null>(null);
    const [forecast, setForecast] = useState<IForecast | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');


    useEffect(() => {

        if (!navigator.geolocation)
            setError('Geolocation not supported in this browser! Try searching for a city instead');
        else
            navigator.geolocation.getCurrentPosition(
                async ({ coords }) => {
                    try {
                        const weatherResBody: IWeatherResponse = await axios
                            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=ad11fc31a252a99700e36bc6800e20c6&units=metric`)
                            .then(res => res.data)
                        setWeather({
                            description: weatherResBody.weather[0].description,
                            main: weatherResBody.main,
                            wind: weatherResBody.wind,
                            name: weatherResBody.name,
                            country: weatherResBody.sys.country,
                            timestamp: weatherResBody.dt
                        });
                        const forecastResBody: IForecastResponse = await axios
                            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&appid=ad11fc31a252a99700e36bc6800e20c6&exclude=minutely&units=metric`)
                            .then(res => res.data)
                        setForecast({
                            hourly: forecastResBody.hourly,
                            daily: forecastResBody.daily
                        });
                        setLoading(false);
                    } catch (err) {
                        setLoading(false);
                        setError('Could not get weather data! Try again later');
                    }
                },
                () => {
                    setLoading(false);
                    setError('Geolocation not active! Try searching for a city instead');
                }
            );

        return () => {
            setError('');
            setLoading(true);
        };
    }, []);



    if (loading) return <h1 className='loading'>Loading</h1>;

    if (error !== '') return <h1 className='error'>{error}</h1>


    const {name, country, timestamp, main, wind, description} = weather!
    return (
        <div className='WeatherPage'>
            <h1 className="cityTitle title">{name}, {country}</h1>
            <Card
                date={new Date(timestamp * 1000)}
                time={false}
                data={main.temp + '°C'}
                temp={main.temp > 25 ? 'hot' : main.temp < 20 ? 'cold' : null}
                description={description}
            />
            <h1 className='dailyTitle title'>Daily Forecast</h1>
            <Swiper spaceBetween={50} slidesPerView={1} navigation modules={[Navigation]}>
                {forecast!.daily.map(day => (
                    <SwiperSlide key={day.dt}>
                        <Card
                            key={day.dt}
                            date={new Date(day.dt * 1000)}
                            time={false}
                            data={day.temp.min + '°C/' + day.temp.max + '°C'}
                            temp={day.temp.max > 25 ? 'hot' : day.temp.max < 20 ? 'cold' : null}
                            description={day.weather[0].description}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <h1 className='hourTitle title'>Hourly Forecast</h1>
            <Swiper spaceBetween={50} slidesPerView={1} navigation modules={[Navigation]}>
                {forecast!.hourly.map(hour => (
                    <SwiperSlide key={hour.dt}>
                        <Card
                            key={hour.dt}
                            date={new Date(hour.dt * 1000)}
                            time={true}
                            data={hour.temp + '°C'}
                            temp={hour.temp > 25 ? 'hot' : hour.temp < 20 ? 'cold' : null}
                            description={hour.weather[0].description}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <h1 className='windTitle title'>Wind</h1>
            <Card
                date={new Date(timestamp * 1000)}
                time={false}
                data={wind.speed + 'km/h'}
            />
            <h1 className='humTitle title'>Humidity</h1>
            <Card
                date={new Date(timestamp * 1000)}
                time={false}
                data={main.humidity + '%'}
            />

        </div>
    )
}