import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { API} from "../api/weatherApi";

interface WeatherState {
    data: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    status: 'idle',
    error: null,
};

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async ({ position, city, unit }: { position?: GeolocationPosition; city?: string; unit: 'metric' | 'imperial' }) => {
        let url = '';
        if (position) {
            const { latitude, longitude } = position.coords;
            url = `${API}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=32f06b25c797082c9415db0e54cde29e`;
        } else if (city) {
            url = `${API}/data/2.5/forecast?q=${city}&units=${unit}&appid=32f06b25c797082c9415db0e54cde29e`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch weather data';
            });
    },
});

export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;