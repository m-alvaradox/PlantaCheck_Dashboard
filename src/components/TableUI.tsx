import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import DataFetcher from '../functions/DataFetcher';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'label', headerName: 'Hora', width: 150 },
  { field: 'value1', headerName: 'Temp. Aire (°C)', width: 150 },
  { field: 'value2', headerName: 'Humedad Suelo (m³/m³)', width: 200 },
  {
    field: 'resumen',
    headerName: 'Resumen',
    description: 'Temp y humedad combinadas',
    sortable: false,
    hideable: false,
    width: 200,
    valueGetter: (_, row) => `${row.label || ''} → ${row.value1 || ''}°C, ${row.value2 || ''} m³/m³`,
  },
];

function combineArrays(labels: string[], val1: number[], val2: number[]) {
  return labels.map((label, i) => ({
    id: i,
    label,
    value1: val1[i],
    value2: val2[i]
  }));
}

export default function TableUI() {
  const { data, loading, error } = DataFetcher();

  if (loading) return <p>Cargando tabla...</p>;
  if (error) return <p>Error al cargar datos: {error}</p>;
  if (!data) return null;

  const labels = data.hourly.time.slice(0, 10);
  const temp = data.hourly.temperature_2m.slice(0, 10);
  const humedad = data.hourly.soil_moisture_0_1cm.slice(0, 10);
  const rows = combineArrays(labels, temp, humedad);

  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}