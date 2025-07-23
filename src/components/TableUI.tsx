import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

interface TableUIProps {
   labels: string[];
   values1: number[];
   values2: number[];
   units1: string;
   units2: string;
   loading: boolean;
   error: string | null;
}


function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

export default function TableUI({ labels, values1, values2, units1, units2, loading, error }: TableUIProps) {
   console.log('labels', labels);
   console.log('values1', values1);
   console.log('values2', values2);

   if (loading) return <Typography>Cargando tabla...</Typography>;
   if (error) return <Typography color="error">Error al cargar la tabla: {error}</Typography>;
   if (!labels.length) return <Typography>No hay datos para mostrar.</Typography>;

   const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
         field: 'label',
         headerName: 'Hora',
         width: 180,
      },
      {
         field: 'value1',
         headerName: `Temperatura (${units1})`,
         width: 180,
      },
      {
         field: 'value2',
         headerName: `Velocidad del viento (${units2})`,
         width: 180,
      },
      {
         field: 'resumen',
         headerName: 'Resumen',
         description: 'No es posible ordenar u ocultar esta columna.',
         sortable: false,
         hideable: false,
         width: 220,
         valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
      },
   ];

   const rows = combineArrays(labels, values1, values2);

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
