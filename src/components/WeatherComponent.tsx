import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchWeather, selectWeather } from '../redux/weatherSlice';
import {Card, Container, DeyTemp, Nav, SearchForm, TemperatureBlock, Time} from './index';

enum Unit {
    Metric = 'metric',
    Imperial = 'imperial'
}

const WeatherComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const weather = useAppSelector(selectWeather);
    const [unit, setUnit] = useState<Unit>(Unit.Metric);
    const [city, setCity] = useState<string>('');
    const [selectedDay, setSelectedDay] = useState<number>(0);

    const handleSearch = () => {
        if (city) {
            dispatch(fetchWeather({city, unit}));
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(fetchWeather({position, unit}));
            },
            (error) => {
                console.error('Error getting location', error);
            }
        );
    }, [dispatch, unit]);

    const toggleUnit = (selectedUnit: Unit) => {
        setUnit(selectedUnit);
    };


    if (weather.status === 'loading') {
        return <div>Loading...</div>;
    }

    if (weather.status === 'failed') {
        return <div>Error: {weather.error}</div>;
    }

    const handleDayChange = (index: number) => {
        setSelectedDay(index);
    };

    const dailyForecasts = weather.data?.list?.filter((_: any, index: number) => index % 8 === 0);
    const selectedDayForecast = dailyForecasts?.[selectedDay];
    const hourlyForecasts = weather.data?.list?.filter((forecast: any) => {
        const forecastDate = new Date(forecast.dt * 1000);
        const selectedDate = new Date(selectedDayForecast?.dt * 1000);
        return forecastDate.getDate() === selectedDate.getDate();
    }) || [];
    const getWeatherDescription = (description: string) => {
        if (description.includes('cloud')) {
            return 'Cloudy';
        } else if (description.includes('sun') || description.includes('clear')) {
            return 'Sunny';
        }
        return description;
    };
    return (
        <Container>
            <Nav>
                <SearchForm>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                    />
                    <button type="button" onClick={handleSearch}>Search</button>
                </SearchForm>
                <TemperatureBlock>
                    <button onClick={() => toggleUnit(Unit.Metric)}>°C</button>
                    <button onClick={() => toggleUnit(Unit.Imperial)}>°F</button>
                </TemperatureBlock>
            </Nav>

            <Card>
                {selectedDayForecast && (
                    <div className='infoCard'>
                        <p>{weather.data.city.name}</p>
                        <p>{selectedDayForecast.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                        <p>{getWeatherDescription(selectedDayForecast.weather[0].description)}</p>
                    </div>
                )}
                <Time>
                    {hourlyForecasts.map((forecast: any, index: number) => (
                        <div className='timeBlock' key={index}>
                            <span>{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <span>{forecast.main.temp}°{unit === 'metric' ? 'C' : 'F'}</span>
                        </div>
                    ))}
                </Time>
            </Card>

            <div>
                <DeyTemp>
                    {dailyForecasts?.map((forecast: any, index: number) => (
                        <div key={index} onClick={() => handleDayChange(index)}>
                            <span>{new Date(forecast.dt * 1000).toLocaleDateString()} </span>
                            <span>{forecast.main.temp}°{unit === 'metric' ? 'C' : 'F'}</span>
                        </div>
                    ))}
                </DeyTemp>

            </div>
        </Container>
    );
}

export default WeatherComponent;