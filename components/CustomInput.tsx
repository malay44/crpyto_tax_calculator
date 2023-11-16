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
        color: 'gray.main',
        WebkitTextFillColor: 'unset!important',
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
        sm: '1rem',
        xs: '0.9rem'
    },
    color: 'gray.main',
    width: 'auto',
    padding: '13px 16px',
    marginTop: '5px',
    transition: 'all 0.2s ease',
    // Use the system font instead of the default Roboto font.
    '&:focus-within': {
        backgroundColor: '#fff',
        borderColor: 'blue.main',
    },
};

interface CustomizedInputsProps {
    title?: string;
    val: string;
    disabled?: boolean;
    placeholder?: string;
    country?: string;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomizedInputs({ title, val, disabled, handleChange, placeholder, country }: CustomizedInputsProps) {
    return (
        <FormControl fullWidth disabled={disabled} variant="standard">
            <Typography variant="h5" fontWeight={400} color="gray.main">{title}</Typography>
            <InputBase
                type='number'
                sx={BootstrapInputStyle}
                value={val}
                onChange={handleChange}
                placeholder={placeholder}
                id="bootstrap-input"
                startAdornment={<InputAdornment className='hehe' position="start">{country === 'Australia' ? '$' : '₹'}</InputAdornment>}
            />
        </FormControl>
    );
}