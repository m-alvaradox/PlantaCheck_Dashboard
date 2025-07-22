//import { useState } from 'react'
import { Grid } from '@mui/material';
import './App.css'

function App() {
   return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
         <Grid>Elemento: Encabezado</Grid>
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Encabezado</Grid>

         {/* Alertas */}
         <Grid>Elemento: Alertas</Grid>

         {/* Selector */}
         <Grid>Elemento: Selector</Grid>
         <Grid size={{ xs: 12, md: 3  }}>Elemento: Selector</Grid>

         {/* Indicadores */}
         <Grid>Elemento: Indicadores</Grid>
         <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

         {/* Gráfico */}
         <Grid
          sx={{ display: { xs: "none", md: "block"} }} >
          Elemento: Gráfico
         </Grid>

         {/* Tabla */}
         <Grid
         sx={{ display: { xs: "none", md: "block" } }}>
          Elemento: Tabla</Grid>

         {/* Información adicional */}
         <Grid>Elemento: Información adicional</Grid>

      </Grid>
   );
}

export default App
