import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { InputAdornment } from '@mui/material';


const BootstrapInputStyle = {
    'label + &': {
        marginTop: 3,
    },
    '& .MuiTypography-root': {
        font: '500 17px/24px Inter',
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
    font: '500 17px/24px Inter',
    color: 'gray.main',
    width: 'auto',
    padding: '17px 16px',
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
            <InputLabel sx={{
                font: '400 20px Inter',
                color: 'gray.main',
            }} shrink htmlFor="bootstrap-input">
                Bootstrap
            </InputLabel>
            <InputBase sx={BootstrapInputStyle} defaultValue="react-bootstrap" id="bootstrap-input" startAdornment={<InputAdornment position="start">$</InputAdornment>} />
        </FormControl>
    );
}