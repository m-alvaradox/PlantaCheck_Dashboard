import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function DataFetcher(lat: number, lon: number) : DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,soil_temperature_0cm,soil_moisture_0_1cm,precipitation,sunshine_duration,uv_index,weathercode&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm&timezone=America%2FChicago`;

        const fetchData = async () => {

            try {

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const result: OpenMeteoResponse = await response.json();
                setData(result);

            } catch (err: any) {

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }

            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [lat, lon]); // Se vuelve a ejecutar si cambian lat/lon

    return { data, loading, error };

}