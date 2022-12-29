export interface IWeather {
    description: string;
    main: {
        temp: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    country: string;
    timestamp: number;
    name: string;
}

export interface IWeatherResponse {
    weather: Array<{ id: number; description: string }>;
    main: { temp: number; humidity: number };
    wind: { speed: number };
    name: string;
    sys: {
        country: string;
    };
    dt: number;
}

export interface IWeatherSearchResponse {
    weather: Array<{ id: number; description: string }>;
    main: { temp: number; humidity: number };
    wind: { speed: number };
    name: string;
    sys: {
        country: string;
    };
    dt: number;
    coord: {
        lat: number;
        lon: number;
    };
}

export interface IForecast {
    hourly: Array<{
        dt: number;
        temp: number;
        weather: Array<{ id: number; description: string }>;
    }>;
    daily: Array<{
        dt: number;
        temp: { min: number; max: number };
        weather: Array<{ id: number; description: string }>;
    }>;
}

export interface IForecastResponse {
    hourly: Array<{
        dt: number;
        temp: number;
        weather: Array<{ id: number; description: string }>;
    }>;
    daily: Array<{
        dt: number;
        temp: { min: number; max: number };
        weather: Array<{ id: number; description: string }>;
    }>;
}

export interface ICardProps {
    date: Date;
    data: string;

    time: boolean;
    temp?: 'hot' | 'cold' | null;
    description?: string;
}