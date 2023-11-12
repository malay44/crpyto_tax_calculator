"use client";
import CustomInput from '@/components/CustomInput';
import InvestmentType from '@/components/InvestmentType';
import { Box, CssBaseline, SelectChangeEvent, Typography } from '@mui/material';
import React, { useState } from 'react';
import DropDown from '@/components/DropDown';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

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

  const [countryOption, setCountryOption] = React.useState('');

  const handleCountryOptionChange = (event: SelectChangeEvent) => {
    setCountryOption(event.target.value);
  };

  const FinancialYear: optionType[] = [];

  const dynamicYear = () => {
    let date = new Date();
    let year = date.getFullYear();
    for (let i = 0; i < 10; i++) {
      FinancialYear.push({ label: ` FY ${year - i}-${(year - i + 1).toString().slice(-2)}` })
    }
  }

  dynamicYear();

  const [yearOption, setYearOption] = React.useState('');

  const handleYearOptionChange = (event: SelectChangeEvent) => {
    setYearOption(event.target.value);
  };;

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Grid2 container spacing={2} padding={2} width={'100%'} maxWidth={'1330px'} >
        <Grid2 xs={12} md={8}>
          <Box sx={{ // left side box
            borderRadius: 8,
            padding: '5%',
            backgroundColor: 'white',
          }}>
            <Typography variant='h2' sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '35px' }}>Free Crypto Tax Calculator Australia</Typography> {/* title */}
            <Grid2 container rowSpacing={{ xs: '20px', sm: '28px' }} columnSpacing={'40px'}>
              <Grid2 xs={6}>
                <DropDown title='Financial Year' handleChange={handleYearOptionChange} options={FinancialYear} val={yearOption} />
              </Grid2>
              <Grid2 xs={6}>
                <DropDown title='Country' handleChange={handleCountryOptionChange} options={countries} val={countryOption} />
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
        <Grid2 xs={12} md={4}>
          <Box sx={{ // advert box
            borderRadius: 8,
            aspectRatio: { md: '0.8', xs: '2' },
            backgroundColor: 'blue.main',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}></Box>
        </Grid2>
      </Grid2>
    </Box>
    // <div>
    //   <InvestmentType type={type} handleChange={handleChange} title='Investment Type' />
    //   <hr />
    //   <hr />
    //   <CustomInput />
    //   <DropDown title='Country' handleChange={handleOptionChange} options={countries} val={option}  />
    // </div>
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