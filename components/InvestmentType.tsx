"use client";
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import { type } from 'os';

type InvestmentTypeProps = {
    type: string;
    handleChange: (event: React.MouseEvent<HTMLElement>, newtype: string) => void;
}

export default function ColorToggleButton({ type, handleChange }: InvestmentTypeProps) {

    const customStyle = {
        gap: '1rem',
        '& .MuiToggleButton-root': {
            borderRadius: '8px!important',
            borderLeft: '2px solid !important',
            border: '2px solid',
            borderColor: 'gray.main!important',
            font: '500 17px/24px Inter',
            color: 'gray.main',
            width: 'auto',
            padding: '17px 16px',
            transition: 'all 0.2s ease',
            "::before": {
                // display text under button 
                content: 'attr(data-custom-attribute)',
                position: 'absolute',
                top: '100%',
                fontSize: '0.75rem',
                color: 'gray.main',

            },
            '&:focus-within.Mui-selected': {
                color: 'blue.main',
                backgroundColor: '#0052FE0F',
                borderColor: 'blue.dark!important',
            },
        },
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={type}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={customStyle}
        >
            <ToggleButton disableRipple value="Short Term" data-custom-attribute="< 12 months">
                Short Term
                <CheckIcon sx={{
                    color: (type==='Short Term') ? 'blue.main' : 'white',
                    marginLeft: '0.5rem',
                }}/>
            </ToggleButton>
            <ToggleButton disableRipple value="Long Term" data-custom-attribute="> 12 months">
                Long Term 
                <CheckIcon sx={{
                    color: (type==='Long Term') ? 'blue.main' : 'white',
                    marginLeft: '0.5rem',
                }}/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}