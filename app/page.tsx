"use client";
import CustomInput from '@/components/CustomInput';
import InvestmentType from '@/components/InvestmentType';
import { Box, Divider, SelectChangeEvent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DropDown from '@/components/DropDown';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ResultBox from '@/components/ResultBox';
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Page() {

  interface optionType {
    code?: string;
    label: string;
  }

  const countries: optionType[] = [
    // { code: 'GB', label: 'United Kingdom' },
    { code: 'AU', label: 'Australia' },
  ];
  const FinancialYear: optionType[] = [{ label: 'FY 2023-24' }];

  const dynamicYear = () => {
    let date = new Date();
    let year = date.getFullYear();
    for (let i = 0; i < 10; i++) {
      FinancialYear.push({ label: ` FY ${year - i}-${(year - i + 1).toString().slice(-2)}` })
    }
  }

  // dynamicYear(); for future use

  const incomes: optionType[] = [
    { label: '$0 - $18,200' },
    { label: '$18,201 - $45,000' },
    { label: '$45,001 - $120,000' },
    { label: '$120,001 - $180,000' },
    { label: '$180,001+' },
  ];


  const [investmentType, setType] = useState('Short Term');
  const [countryOption, setCountryOption] = React.useState('');
  const [yearOption, setYearOption] = React.useState('');
  const [incomeOption, setIncomeOption] = React.useState('');
  const [inputValues, setInputValues] = useState({
    purchasePrice: '',
    salePrice: '',
    expenses: '',
  });
  const [Output, setOutput] = useState({
    capitalGain: '', //Capital gains amount
    longTermGainDiscount: '', //Discount for long term gains
    taxableCapitalGain: '', //Net Capital gains tax amount
    taxToBepayed: '', //The tax you need to pay
  });

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newtype: string,
  ) => {
    if (newtype !== null) {
      setType(newtype);
    }
  };

  const handleCountryOptionChange = (event: SelectChangeEvent) => {
    setCountryOption(event.target.value);
  };


  const handleYearOptionChange = (event: SelectChangeEvent) => {
    setYearOption(event.target.value);
  };;

  const handleIncomeChange = (event: SelectChangeEvent) => {
    setIncomeOption(event.target.value);
  };

  const handleInputChange = (key: keyof typeof inputValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: event.target.value,
    }));
  };

  useEffect(() => {
    const calculateTax = () => {
      let taxRate = 0;

      switch (incomeOption) {
        case '$0 - $18,200':
          taxRate = 0;
          break;
        case '$18,201 - $45,000':
          taxRate = 0.19;
          break;
        case '$45,001 - $120,000':
          taxRate = 0.325;
          break;
        case '$120,001 - $180,000':
          taxRate = 0.37;
          break;
        case '$180,001+':
          taxRate = 0.45;
          break;
        default:
          break;
      }

      // Convert input values to numbers
      const purchasePrice = parseFloat(inputValues.purchasePrice);
      const salePrice = parseFloat(inputValues.salePrice);
      const expenses = parseFloat(inputValues.expenses);
      const capitalGainsAmount = salePrice - purchasePrice - expenses;

      let discountForLongTermGains = 0;
      if (investmentType === 'Long Term' && capitalGainsAmount > 0) {
        discountForLongTermGains = 0.5 * capitalGainsAmount;
      }

      const netCapitalGains =
        investmentType === 'Long Term'
          ? capitalGainsAmount - discountForLongTermGains
          : capitalGainsAmount;

      const taxToBePaid = netCapitalGains * taxRate;

      // Update the Output state
      setOutput({
        capitalGain: capitalGainsAmount.toFixed(2),
        longTermGainDiscount: discountForLongTermGains.toFixed(2),
        taxableCapitalGain: netCapitalGains.toFixed(2),
        taxToBepayed: taxToBePaid.toFixed(2),
      });
    };

    calculateTax();
  }, [investmentType, incomeOption, inputValues]);


  return (
    <Box
      className={inter.className}
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: { md: 'gray.light', sm: 'white' },
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
            border: { xs: '2px solid', md: 'none' },
            borderColor: { xs: 'gray.A100' },
          }}>
            <Typography variant='h2' sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '35px' }}>Free Crypto Tax Calculator Australia</Typography> {/* title */}
            <Grid2 container rowSpacing={{ xs: '20px', sm: '28px' }} columnSpacing={'40px'}> {/* input boxes */}
              <Grid2 xs={6}> {/* financial year select option */}
                <DropDown title='Financial Year' handleChange={handleYearOptionChange} options={FinancialYear} val={yearOption} />
              </Grid2>
              <Grid2 xs={6}> {/* country select option */}
                <DropDown title='Country' handleChange={handleCountryOptionChange} options={countries} val={countryOption} />
              </Grid2>
              <Grid2 xs={12} sx={{ color: 'gray.light' }}> {/* HR tag */}
                <Divider />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <CustomInput title='Enter purchase price of Crypto' val={inputValues.purchasePrice} handleChange={handleInputChange('purchasePrice')} />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <CustomInput title='Enter sale price of Crypto' val={inputValues.salePrice} handleChange={handleInputChange('salePrice')} />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <CustomInput title='Enter your Expenses' val={inputValues.expenses} handleChange={handleInputChange('expenses')} />
              </Grid2>
              {countryOption === 'Australia' &&
                <>
                  <Grid2 xs={12} sm={6}>
                    <InvestmentType title='Investment Type' type={investmentType} handleChange={handleChange} />
                    {/* add a text under two buttons from above component */}
                    <Box sx={{ display: 'flex', gap: '1rem', marginTop: '6px' }}>
                      <Typography sx={{ width: '100%', fontSize: '0.75rem', color: 'gray.main' }}> {'< 12 months'} </Typography>
                      <Typography sx={{ width: '100%', fontSize: '0.75rem', color: 'gray.main' }}> {'> 12 months'} </Typography>
                    </Box>
                  </Grid2>
                </>}
              <Grid2 xs={12} sm={6}>
                <Typography variant="h5" fontWeight={400} color="gray.main" marginBottom={'5px'}>Select Your Annual Income</Typography>
                <DropDown handleChange={handleIncomeChange} options={incomes} val={incomeOption} />
              </Grid2>
              {countryOption === 'Australia' &&
                <>
                  <Grid2 xs={12} sm={6} display={'flex'} flexDirection={{ sm: 'column' }} justifyContent={{ sm: 'flex-end' }} marginTop={'-10px'}>
                    <Typography variant="body2" fontWeight={400} color="gray.main" marginBottom={'5px'}>Tax Rate:  </Typography>
                    <Typography variant="body2" fontWeight={400} color="gray.main" marginBottom={'5px'}>$ 5,902 + 32.5% of excess over $45,001 </Typography>
                  </Grid2>
                  {investmentType === 'Long Term' &&
                    <>
                      <Grid2 xs={12} sm={6}> {/* output:-  capital gain amount */}
                        <CustomInput title='Capital Gain Amount' val={Output.capitalGain} disabled={true} />
                      </Grid2>
                      <Grid2 xs={12} sm={6}> {/* output:-  Discount for long term gains */}
                        <CustomInput title='Discount for long term gains' val={Output.longTermGainDiscount} disabled={true} />
                      </Grid2>
                    </>
                  }
                </>
              }
              <Grid2 xs={12} sm={6}> {/* output:-  Taxable Capital Gain */}
                <ResultBox title='Net Capital gains tax amount' val={Output.taxableCapitalGain} color='green' />
              </Grid2>
              <Grid2 xs={12} sm={6}> {/* output:-  The tax you need to pay* */}
                <ResultBox title='The tax you need to pay*' val={Output.taxToBepayed} color='blue' />
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
  )
}