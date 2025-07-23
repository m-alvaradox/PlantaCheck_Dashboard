import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import DataFetcher from '../functions/DataFetcher';

export default function ChartUI() {
  const { data, loading, error } = DataFetcher();

  if (loading) return <p>Cargando gráfico...</p>;
  if (error) return <p>Error al cargar gráfico: {error}</p>;
  if (!data) return null;

  const labels = data.hourly.time.slice(0, 10);
  const temp = data.hourly.temperature_2m.slice(0, 10);
  const humedad = data.hourly.soil_moisture_0_1cm.slice(0, 10);

  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura vs Humedad del Suelo
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: temp, label: 'Temp. aire (°C)' },
          { data: humedad, label: 'Humedad suelo (m³/m³)' },
        ]}
        xAxis={[{ scaleType: 'point', data: labels }]}
      />
    </>
  );
}