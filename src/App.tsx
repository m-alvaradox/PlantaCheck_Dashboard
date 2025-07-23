import { useState } from 'react'
import { Grid } from '@mui/material';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import ChartUI from './components/ChartUI';
import TableUI from './components/TableUI';

function App() {
   const dataFetcherOutput = DataFetcher();
   return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
         <Grid>
            <HeaderUI/>
         </Grid>
         <Grid size={{ xs: 12, md: 12 }}></Grid>

         {/* Alertas */}
         <Grid container justifyContent="right" alignItems="center">
            <AlertUI description="No se preveen lluvias"/>
         </Grid>
            
         {/* Selector */}
         <Grid>
            <SelectorUI />
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
                             description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura aparente'
                             description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Velocidad del viento'
                             description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Humedad relativa'
                             description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
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
          <ChartUI />
         </Grid>

         {/* Tabla */}
         <Grid sx={{ display: { xs: "none", md: "block" }, height: 400, width: '100%' }}>
         <TableUI />
         </Grid>

         {/* Información adicional */}
         <Grid></Grid>

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

export default App
