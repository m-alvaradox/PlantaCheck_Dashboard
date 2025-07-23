import { useState } from 'react'
import { Grid, Box, Typography } from '@mui/material';
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import ChartUI from './components/ChartUI';
import TableUI from './components/TableUI';
import CohereAssistant from './components/CohereAssistant';

type CityName = 'guayaquil' | 'quito' | 'manta' | 'cuenca';

const cityCoordinates: Record<CityName, { lat: number; lon: number }> = {
  guayaquil: { lat: -2.1962, lon: -79.8862 },
  quito: { lat: -0.1807, lon: -78.4678 },
  manta: { lat: -0.9677, lon: -80.7089 },
  cuenca: { lat: -2.9006, lon: -79.0045 },
};

function App() {
   const [selectedCity, setSelectedCity] = useState<CityName>('guayaquil');
   const coords = cityCoordinates[selectedCity];
   
   const dataFetcherOutput = DataFetcher(coords.lat, coords.lon);
   return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
         <Grid>
            <HeaderUI/>
         </Grid>

         <CohereAssistant
            weatherContext={
              dataFetcherOutput.data
                ? `Temperatura: ${dataFetcherOutput.data.current.temperature_2m}°C, Humedad: ${dataFetcherOutput.data.current.relative_humidity_2m}%`
                : "Datos meteorológicos no disponibles."
            }
         />
         

         {/* Alertas */}
         <Grid container justifyContent="right" alignItems="center">
            <AlertUI description="No se preveen lluvias"/>
         </Grid>
            
         {/* Selector */}
         <Grid>
            <SelectorUI onCityChange={setSelectedCity} />
         </Grid>
         <Grid size={{ xs: 12, md: 3  }}></Grid>

         {/* Indicadores */}
         <Grid container size={{ xs: 12, md: 9 }} >

                 {/* Renderizado condicional de los datos obtenidos */}

                 {dataFetcherOutput.loading && <p>Cargando datos...</p>}
                 {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
                 {dataFetcherOutput.data && (
                 <>

                     {/* Indicadores con datos obtenidos */}

                     <Grid size={{ xs: 12, md: 3 }} >
                         <IndicatorUI
                             title='Temperatura (2m)'
                             description={`${dataFetcherOutput.data.current.temperature_2m} ${dataFetcherOutput.data.current_units.temperature_2m}`} />
                     </Grid>
    


                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura aparente'
                             description={`${dataFetcherOutput.data.current.apparent_temperature} ${dataFetcherOutput.data.current_units.apparent_temperature}`} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Velocidad del viento'
                             description={`${dataFetcherOutput.data.current.wind_speed_10m} ${dataFetcherOutput.data.current_units.wind_speed_10m}`} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Humedad relativa'
                             description={`${dataFetcherOutput.data.current.relative_humidity_2m} ${dataFetcherOutput.data.current_units.relative_humidity_2m}`} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title="Temperatura del suelo (0 cm)"
                              description={dataFetcherOutput.data.hourly.soil_temperature_0cm[0] + " °C"} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title="Humedad del suelo (0–1 cm)"
                              description={dataFetcherOutput.data.hourly.soil_moisture_0_1cm[0] + " m³/m³"} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title="Precipitación"
                              description={dataFetcherOutput.data.hourly.precipitation[0] + " mm"} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title="Horas de sol"
                              description={dataFetcherOutput.data.hourly.sunshine_duration[0] + " min"} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title="Índice UV"
                              description={dataFetcherOutput.data.hourly.uv_index[0] + ""} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title="Estado del clima"
                              description={getWeatherDescription(dataFetcherOutput.data.hourly.weathercode[0])} />
                        </Grid>

                 </>
                 )}

         </Grid>

         <Grid size={{ xs: 12, md: 9 }}></Grid>

         {/* Gráfico */}
         <Grid
          sx={{ display: { xs: "none", md: "block"} }} >
        <ChartUI
          labels={dataFetcherOutput.data?.hourly?.time.slice(0, 25) ?? []}
          values1={dataFetcherOutput.data?.hourly?.temperature_2m.slice(0, 25) ?? []}
          values2={dataFetcherOutput.data?.hourly?.soil_moisture_0_1cm.slice(0, 25) ?? []}
          units1={dataFetcherOutput.data?.hourly_units?.temperature_2m ?? ''}
          units2={dataFetcherOutput.data?.hourly_units?.soil_moisture_0_1cm ?? ''}
          loading={dataFetcherOutput.loading}
          error={dataFetcherOutput.error}
        />
         </Grid>

                  {/* 🔔 Recomendaciones para plantas */}
         <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Recomendaciones para tus plantas 🌱</Typography>
            <ul>
            {generarRecomendaciones(dataFetcherOutput.data).map((rec, i) => (
               <li key={i}>{rec}</li>
            ))}
            </ul>
         </Box>

         {/* Tabla */}
         <Grid sx={{ display: { xs: "none", md: "block" }, height: 400, width: '100%' }}>
        <TableUI
          labels={dataFetcherOutput.data?.hourly?.time ?? []}
          values1={dataFetcherOutput.data?.hourly?.temperature_2m ?? []}
          values2={dataFetcherOutput.data?.hourly?.soil_moisture_0_1cm ?? []}
          units1={dataFetcherOutput.data?.hourly_units?.temperature_2m ?? ''}
          units2={dataFetcherOutput.data?.hourly_units?.soil_moisture_0_1cm ?? ''}
          loading={dataFetcherOutput.loading}
          error={dataFetcherOutput.error}
        />
         </Grid>        

      </Grid>
   );
}

function getWeatherDescription(weatherCode: number): string {
    switch (weatherCode) {
        case 0: return "Despejado";
        case 1: return "Mayormente despejado";
        case 2: return "Parcialmente nublado";
        case 3: return "Nublado";
        case 45:
        case 48: return "Niebla";
        case 51:
        case 53:
        case 55: return "Llovizna";
        case 61:
        case 63:
        case 65: return "Lluvia";
        case 80:
        case 81:
        case 82: return "Lluvias dispersas";
        case 95: return "Tormenta eléctrica";
        case 96:
        case 99: return "Tormenta con granizo";
        default: return "Estado del clima desconocido";
    }
}

function generarRecomendaciones(data: any | null): string[] {
  const recomendaciones: string[] = [];

  // Protege contra null o estructura faltante
  if (!data || !data.hourly) {
    return ["Datos meteorológicos no disponibles."];
  }

  const temp = data.hourly.temperature_2m?.[0];
  const humedad = data.hourly.soil_moisture_0_1cm?.[0];
  const lluvia = data.hourly.precipitation?.[0];
  const uv = data.hourly.uv_index?.[0];

  if (temp > 30) {
    recomendaciones.push("☀️ Hace calor, riega tus plantas temprano o al atardecer.");
  }

  if (humedad < 0.1) {
    recomendaciones.push("💧 Tu planta podría necesitar agua. Revisa el suelo.");
  }

  if (lluvia > 1) {
    recomendaciones.push("🌧️ Hoy va a llover. No es necesario regar.");
  }

  if (uv > 6) {
    recomendaciones.push("☂️ Alta radiación UV. Protege tus plantas del sol directo.");
  }

  if (recomendaciones.length === 0) {
    recomendaciones.push("✅ Las condiciones climáticas son óptimas para tus plantas.");
  }

  return recomendaciones;
}


export default App
