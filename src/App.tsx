import { useState } from 'react'
import { Grid } from '@mui/material';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';

function App() {
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
         <Grid></Grid>
         <Grid size={{ xs: 12, md: 9 }}></Grid>

         {/* Gráfico */}
         <Grid
          sx={{ display: { xs: "none", md: "block"} }} >
          
         </Grid>

         {/* Tabla */}
         <Grid
         sx={{ display: { xs: "none", md: "block" } }}>
          </Grid>

         {/* Información adicional */}
         <Grid></Grid>

      </Grid>
   );
}

export default App
