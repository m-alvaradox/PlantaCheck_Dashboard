import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
   labels: string[];
   values1: number[];
   values2: number[];
   units1: string;
   units2: string;
   loading: boolean;
   error: string | null;
}

export default function ChartUI({ labels, values1, values2, units1, units2, loading, error }: ChartUIProps) {
  
  if (loading) return <p>Cargando gráfico...</p>;
  if (error) return <p>Error al cargar gráfico: {error}</p>;
  if (!labels.length) return <Typography>No hay datos para mostrar.</Typography>;

   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura ({units1}) y Humedad del Suelo ({units2}) por hora
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: values1, label: `Temp. aire (${units1})` },
               { data: values2, label: `Humedad suelo (${units2})` },
            ]}
            xAxis={[{ scaleType: 'point', data: labels }]}
         />
      </>
   );
}