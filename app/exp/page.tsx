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

  const yearOptions: optionType[] = [
    { label: '2021' },
    { label: '2020' },
  ];

  const [yearOption, setYearOption] = React.useState('');

  const handleYearOptionChange = (event: SelectChangeEvent) => {
    setYearOption(event.target.value);
  };

  return (
    <Grid2 container rowSpacing={{ xs: '20px', sm: '28px' }} columnSpacing={'40px'}>
      <Grid2 xs={6}>
        <DropDown title='Year' handleChange={handleYearOptionChange} options={countries} val={yearOption} />
      </Grid2>
      <Grid2 xs={6}>
        <DropDown title='Country' handleChange={handleCountryOptionChange} options={countries} val={countryOption} />
      </Grid2>
    </Grid2>
  )
}