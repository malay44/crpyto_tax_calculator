import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Image from 'next/image';
import { Typography } from '@mui/material';

interface optionType {
    code?: string;
    label: string;
}

interface SelectLabelsProps {
    title?: string;
    options: optionType[];
    val: string;
    handleChange: (event: SelectChangeEvent) => void;
}

export default function SelectLabels({ title, options, val, handleChange }: SelectLabelsProps) {

    const customStyle = {
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
        border: 'none',
        backgroundColor: 'gray.light',
        fontWeight: 500,
        fontSize: {
            lg: '1.1rem',
            md: '1rem',
            sm: '0.9rem',
            xs: '0.85rem'
        },
        color: 'gray.main',
        width: 'auto',
        minWidth: 'inherit',
        padding: '12px 16px',
        transition: 'all 0.2s ease',
    }

    return (
        <FormControl sx={{ flexDirection: {sm: 'row'}, width: '100%', alignItems: {sm: 'center'}, gap: 1 }}>
            <Typography variant="h5" fontWeight={400} color="gray.main">{title}</Typography>
            <Select
                id='simple-select'
                value={val}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ 'img': { mr: 2}, 'fieldset':{border: 'none'}, flex: 1, alignItems: 'center', ...customStyle }}
            >
                {
                    options.map((option) => (
                        <MenuItem disableRipple key={option.label} value={option.label} sx={{ 'img': { mr: 2, flexShrink: 0 }, alignItems: 'center' }}>
                            {option.code && <Image
                                loading="lazy"
                                width={20}
                                height={20}
                                style={{borderRadius: '50%'}}
                                src={`https://flagcdn.com/w80/${option.code.toLowerCase()}.png`}
                                alt=""
                            />}
                            {option.label}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
}