"use client";
import CustomInput from '@/components/CustomInput';
import InvestmentType from '@/components/InvestmentType';
import { Box, CssBaseline, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import DropDown from '@/components/DropDown';

export default function Page() {
  const [type, setType] = useState('Short Term');
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newtype: string,
  ) => {
    if (newtype !== null) {
      setType(newtype);
    }
  };

  interface optionType {
    code?: string;
    label: string;
  }
  const countries: optionType[] = [
    { code: 'GB', label: 'United Kingdom' },
    { code: 'AU', label: 'Australia' },
  ];
  const [option, setOption] = React.useState('');

  const handleOptionChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };

  return (
    <div>
      <InvestmentType type={type} handleChange={handleChange} title='Investment Type' />
      <hr />
      <hr />
      <CustomInput />
      <DropDown title='Country' handleChange={handleOptionChange} options={countries} val={option}  />
    </div>
    // <Box sx={{
    //   padding: '20px',
    //   backgroundColor: 'gray.light',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }}>
    //   <Box 
    //   sx={{
    //     borderRadius: '8px',
    //     padding: 'max(2rem, 3vw)',
    //     backgroundColor: 'white',
    //     display: 'flex',
    //     gap: '20px',
    //     flexBasis: '70%'
    //   }}>
    //     <CustomInput />
    //     <CustomInput />
    //   </Box>
    //   <Box sx={{
    //     flexBasis: '30%'
    //   }}>
    //   </Box>
    // </Box>
  )
}