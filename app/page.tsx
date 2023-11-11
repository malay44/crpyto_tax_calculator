"use client";
import CustomInput from '@/components/CustomInput';
import InvestmentType from '@/components/InvestmentType';
import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';

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

  return (
    <div>
      <InvestmentType type={type} handleChange={handleChange} title='Investment Type' />
      <hr />
      <hr />
      <CustomInput />
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