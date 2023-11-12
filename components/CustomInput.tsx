import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { InputAdornment, Typography } from '@mui/material';


const BootstrapInputStyle = {
    'label + &': {
        marginTop: 3,
    },
    '& .MuiTypography-root': {
        font: 'inherit',
        color: 'gray.main',
    },
    '& .MuiInputBase-input': {
        padding: 0,
    },
    borderRadius: '8px',
    // position: 'relative',
    backgroundColor: 'gray.light',
    border: '1px transparent solid',
    borderColor: '#fffff',
    fontWeight: 500,
    fontSize: {
        lg: '1.1rem',
        md: '1rem',
        sm: '0.9rem',
        xs: '0.85rem'
    },
    color: 'gray.main',
    width: 'auto',
    padding: '13px 16px',
    transition: 'all 0.2s ease',
    // Use the system font instead of the default Roboto font.
    '&:focus-within': {
        backgroundColor: '#fff',
        borderColor: 'blue.main',
    },
};


export default function CustomizedInputsStyled() {
    return (
        <FormControl fullWidth variant="standard">
            <Typography variant="h5" fontWeight={400} color="gray.main">Bootstrap</Typography>
            <InputBase
                sx={BootstrapInputStyle}
                defaultValue="react-bootstrap"
                id="bootstrap-input"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        </FormControl>
    );
}