import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

type CityName = 'guayaquil' | 'quito' | 'manta' | 'cuenca';

interface SelectorProps {
    onCityChange: (city: CityName) => void;
}

export default function SelectorUI({ onCityChange }: SelectorProps) {

    const [cityInput, setCityInput] = useState<CityName>('guayaquil');
    
    const handleChange = (event: SelectChangeEvent<string>) => {
        const newCity = event.target.value as CityName;
        setCityInput(newCity);
        onCityChange(newCity);
    };

    const capitalize = (text: string) =>
        text.charAt(0).toUpperCase() + text.slice(1);

return (
   <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
         value={cityInput}
         labelId="city-select-label"
         id="city-simple-select"
         label="Ciudad"
         onChange={handleChange}>
         <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
         <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
         <MenuItem value={"quito"}>Quito</MenuItem>
         <MenuItem value={"manta"}>Manta</MenuItem>
         <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>

        {cityInput && (
        <p>
          Información del clima en <b>{capitalize(cityInput)}</b>
        </p>
)}

   </FormControl>
   )
}