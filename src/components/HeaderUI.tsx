import Typography from '@mui/material/Typography';
import PlantaCheckLogo from '../assets/plantacheck.png';

export default function HeaderUI() {
    return (
        <>
            <img
                src={PlantaCheckLogo}
                alt="Logo PlantaCheck"
                style={{ width: 300, marginBottom: 16 }}
            />

        <Typography
            variant="h4"
            component="h1"
            sx={{fontWeight: 'bold'}}>
            Dashboard
        </Typography>

        </>
    )
    
}