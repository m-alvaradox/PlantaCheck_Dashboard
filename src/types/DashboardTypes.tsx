export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: Currentunits;
  current: Current;
  hourly_units: Hourlyunits;
  hourly: Hourly;
}

export interface Hourly {
  time: string[];
  soil_temperature_0cm: number[];
  soil_moisture_0_1cm: number[];
  precipitation: number[];
  sunshine_duration: number[];
  uv_index: number[];
  weathercode: number[];
}

export interface Hourlyunits {
  time: string;
  soil_temperature_0cm: string;
  soil_moisture_0_1cm: string;
  precipitation: string;
  sunshine_duration: string;
  uv_index: string;
  weathercode: string;
}

export interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
}

export interface Currentunits {
  time: string;
  interval: string;
  temperature_2m: string;
  apparent_temperature: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
}