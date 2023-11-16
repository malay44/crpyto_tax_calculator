"use client";
import CustomInput from '@/components/CustomInput';
import InvestmentType from '@/components/InvestmentType';
import { Box, Divider, SelectChangeEvent, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DropDown from '@/components/DropDown';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ResultBox from '@/components/ResultBox';
import { Inter } from 'next/font/google'
import FAQ from '@/components/FAQ';
import Advert from '@/components/Advert';

const inter = Inter({ subsets: ['latin'] })


export default function Page() {

  interface optionType {
    code?: string;
    label: string;
  }

  const countries: optionType[] = [
    // { code: 'GB', label: 'United Kingdom' },
    { code: 'AU', label: 'Australia' },
    { code: 'IN', label: 'India' }
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

  const indiaIncomes: optionType[] = [
    { label: '₹0 - ₹18,200' },
    { label: '₹18,201 - ₹45,000' },
    { label: '₹45,001 - ₹120,000' },
    { label: '₹120,001 - ₹180,000' },
    { label: '₹180,001+' },
  ]

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
    capitalGain: '0', //Capital gains amount
    longTermGainDiscount: '0', //Discount for long term gains
    taxableCapitalGain: '0', //Net Capital gains tax amount
    taxToBepayed: '0', //The tax you need to pay
  });
  const [currSymbole, setCurrSymbole] = useState('$');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    switch(countryOption){
      case 'Australia':
        setCurrSymbole('$');
        break;
      case 'India':
        setCurrSymbole('₹');
      default:
        break;
    }

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
      // if nan then replace with 0
      setOutput({
        capitalGain: isNaN(capitalGainsAmount) ? '0' : capitalGainsAmount.toString(),
        longTermGainDiscount: isNaN(discountForLongTermGains) ? '0' : discountForLongTermGains.toString(),
        taxableCapitalGain: isNaN(netCapitalGains) ? '0' : netCapitalGains.toString(),
        taxToBepayed: isNaN(taxToBePaid) ? '0' : taxToBePaid.toString(),
      });

      setIsLoading(false);
    };

    setTimeout(() => {
      calculateTax();
    }, 2000);
  }, [investmentType, incomeOption, inputValues, countryOption]);

  return (
    <Box
      className={inter.className}
      sx={{
        width: '100%',
        height: '100vh',
        overflow: 'scroll',
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
                <CustomInput title='Enter purchase price of Crypto' country={countryOption} val={inputValues.purchasePrice} handleChange={handleInputChange('purchasePrice')} />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <CustomInput title='Enter sale price of Crypto' country={countryOption} val={inputValues.salePrice} handleChange={handleInputChange('salePrice')} />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <CustomInput title='Enter your Expenses' country={countryOption} val={inputValues.expenses} handleChange={handleInputChange('expenses')} />
              </Grid2>
              {true &&
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
                <DropDown handleChange={handleIncomeChange} options={countryOption === 'Australia' ? incomes : indiaIncomes} val={incomeOption} />
              </Grid2>
              {true &&
                <>
                  <Grid2 xs={12} sm={6} display={'flex'} flexDirection={{ sm: 'column' }} justifyContent={{ sm: 'flex-end' }} marginTop={'-10px'}>
                    <Typography variant="body2" fontWeight={400} color="gray.main" marginBottom={'5px'}>Tax Rate:  </Typography>
                    <Typography variant="body2" fontWeight={400} color="gray.main" marginBottom={'5px'}>
                      {
                        incomeOption === `${currSymbole}0 - ${currSymbole}18,200` ? `0%` :
                          incomeOption === `${currSymbole}18,201 - ${currSymbole}45,000` ? `Nil + 19% of excess over ${currSymbole}18,200` :
                            incomeOption === `${currSymbole}45,001 - ${currSymbole}120,000` ? `${currSymbole}5,092 + 32.5% of excess over ${currSymbole}45,000` :
                              incomeOption === `${currSymbole}120,001 - ${currSymbole}180,000` ? `${currSymbole}29,467 + 37% of excess over ${currSymbole}120,000` :
                                incomeOption === `${currSymbole}180,001+` ? `${currSymbole}51,667 + 45% of excess over ${currSymbole}180,000` : `0%`
                      }
                    </Typography>
                  </Grid2>
                  {investmentType === 'Long Term' &&
                    <>
                      <Grid2 xs={12} sm={6}> {/* output:-  capital gain amount */}
                        <CustomInput title='Capital Gain Amount' country= {countryOption} val={Output.capitalGain} disabled={true} />
                      </Grid2>
                      <Grid2 xs={12} sm={6}> {/* output:-  Discount for long term gains */}
                        <CustomInput title='Discount for long term gains' country= {countryOption} val={Output.longTermGainDiscount} disabled={true} />
                      </Grid2>
                    </>
                  }
                </>
              }
              <Grid2 xs={12} sm={6}> {/* output:-  Taxable Capital Gain */}
                <ResultBox title='Net Capital gains tax amount' loading={isLoading} currSymbole={currSymbole}  val={Output.taxableCapitalGain} color='green' />
              </Grid2>
              <Grid2 xs={12} sm={6}> {/* output:-  The tax you need to pay* */}
                <ResultBox title='The tax you need to pay*' loading={isLoading} currSymbole={currSymbole} val={Output.taxToBepayed} color='blue' />
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
        <Grid2 xs={4}>
          {useMediaQuery('(min-width:900px)') && 
          <Advert windowSize='big'/>}
        </Grid2>
        <Grid2 xs={12} md={8}>
          <FAQ />
        </Grid2>
        <Grid2 xs={12}>
          {useMediaQuery('(max-width:900px)') &&
            <Advert windowSize='small' />}
        </Grid2>
      </Grid2>
    </Box>
  )
}