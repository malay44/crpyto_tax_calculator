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

  const faqQuestions = [
    '1. How are cryptocurrencies taxed in Australia?',
    '2. What’s the difference between long-term and short-term capital gains?',
    '3. Do I have to pay tax on crypto-to-crypto transactions?',
    '4. How do I lower my cryptocurrency taxes?',
    '5. Can the ATO track crypto?',
    '6. What is the best crypto tax calculator for Australia?',
    '7. Do I have to pay tax if I lose money trading crypto?',
    '8. Is using a crypto tax calculator safe?',
    '9. Which exchanges do you support?',
    '11. How do I use a cryptocurrency tax calculator?',
    '12. How do I calculate my crypto tax in Australia?'
  ];

  const faqAnswers = [
    'The Australian Taxation Office (ATO) regards cryptocurrency as both property, which is subject to Capital Gains Tax (CGT), and income, which is subject to Income Tax. CGT applies when you sell, trade, gift, or make purchases using cryptocurrency. On the other hand, Income Tax applies when you receive cryptocurrency as payment for services, work, mining, staking, or other activities. To simplify tax calculations, consider using a free crypto tax calculator for Australia.',
    'The distinction between long-term and short-term capital gains lies in the duration of ownership. When you own an asset, such as cryptocurrency, for more than 12 months, any gains from its sale are categorised as long-term. These long-term gains often receive a 50% discount on the capital gains tax (CGT). In contrast, if you hold the asset for 12 months or less, the gains are considered short-term, and they are taxed at your regular income tax rate.',
    `Yes, according to the ATO, when you trade one cryptocurrency for another, like NFTs, stablecoins, or tokens, it's seen as selling one asset to buy another, and any profit you make from this exchange is subject to Capital Gains Tax. To compute taxes for crypto-to-crypto transactions, you must determine the fair market value of your coins in AUD at both the acquisition and disposal times. However, this can be challenging because many exchanges use cryptocurrency as the standard for valuation.\n
    Explore KoinX for a streamlined experience in calculating your cryptocurrency taxes. Our historical price engine swiftly delivers the fair market value of your crypto holdings at the time of each transaction, making tax assessment hassle-free.
    `,
    `Here are the top 6 strategies for lowering your cryptocurrency taxes in Australia:
    \n• Hold for over 12 months-
    Hold your crypto for more than 12 months to qualify for a 50% long-term CGT
    discount to reduce your tax liability.
    \n• Offset gains with losses- Offset capital gains with capital losses from cryptocurrency, reducing your
    overall tax burden.
    \n• Claim tax deductions- Explore opportunities to claim significant deductions on your regular income if you're a trader or running a crypto business.
    \n• Use crypto tax tools- Employ crypto tax software like KoinX or seek help from a crypto tax specialist to streamline calculations and ensure compliance.
    \n• Donate to charities- Donate cryptocurrency to registered charities since it's not a taxable event, and claim deductions on the donated amount.
    \n• Full disclosure- Be transparent and disclose all your crypto transactions to the ATO to avoid penalties for hiding trading activities.`,
    `The Australian Taxation Office (ATO) possesses strong tracking capabilities for cryptocurrency transactions. Since 2014, they've been gathering data on crypto activities, including KYC info from exchanges and wallets. The ATO's data matching program, active since 2019, lets them access data from service providers like Binance and CoinJar, covering personal details and transaction specifics. Since 2020, the ATO has been notifying Australian crypto investors to report holdings to avoid penalties.
    `,
    `KoinX is a crypto tax platform that makes it easy to calculate tax on crypto transactions. It also provides portfolio insights of all crypto exchange accounts combined, making it a valuable tool for chartered accountants and VDA Investors alike.`,
    `In Australia, when your cryptocurrency loses value, it's classified as a capital loss. This means you won't have to pay taxes on that loss. It's a way to offset any gains you might have made in other investments for tax purposes.`,
    `KoinX provides a reliable crypto tax calculator that can assist you in determining your tax obligations for cryptocurrency transactions. This tool accurately tracks your portfolio on your preferred exchange and computes your gains or losses based on the crypto amounts and prices involved.
    `,
    `KoinX seamlessly integrates with a wide array of exchanges, including Binance, CoinSpot, MEXC, Bybit, Coinbase, Kraken, and numerous others. It effortlessly consolidates cryptocurrency transactions from over 180+ chains, exchanges, and wallets, presenting them in a user-friendly unified dashboard.`,
    `Transferring cryptocurrency from one wallet to another that you own in Australia is not subject to tax, as it is not recognised as a taxable event, and capital gains tax is not triggered. Nevertheless, it's essential to keep detailed records of these transfers, particularly if you are utilising automated crypto tax software like KoinX. KoinX, as a reliable crypto tax software, can streamline the process, making it easier to maintain accurate and efficient tax records and reporting while ensuring compliance with Australian tax regulations.
    `,
    `In order to use a cryptocurrency tax calculator, you need to input information about your cryptocurrency transactions.
    After you enter your information, the cryptocurrency tax calculator will calculate the gain or loss on every transaction.
    
    This includes:
    1. The financial year you want to calculate your taxes for.
    2. The country you want to calculate your taxes for.
    3. The purchase price of the coin.
    4. The sale price of the coin.
    `,
    `To calculate your crypto tax in Australia accurately, you need to consider both income tax and capital gains tax.

    Income Tax
    In Australia, when an individual (investor) sells, trades, spends, earns (salary, mining, interest) or gifts cryptocurrency, the net capital gain is taxed at the same rate as their Income Tax. This tax rate is determined based on their total income for the tax year.
    `,
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
      // if nan then replace with 0
      setOutput({
        capitalGain: isNaN(capitalGainsAmount) ? '0' : capitalGainsAmount.toString(),
        longTermGainDiscount: isNaN(discountForLongTermGains) ? '0' : discountForLongTermGains.toString(),
        taxableCapitalGain: isNaN(netCapitalGains) ? '0' : netCapitalGains.toString(),
        taxToBepayed: isNaN(taxToBePaid) ? '0' : taxToBePaid.toString(),
      });
    };

    calculateTax();
  }, [investmentType, incomeOption, inputValues]);

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
                    <Typography variant="body2" fontWeight={400} color="gray.main" marginBottom={'5px'}>
                      {
                        incomeOption === '$0 - $18,200' ? '0%' :
                          incomeOption === '$18,201 - $45,000' ? 'Nil + 19% of excess over $18,200' :
                            incomeOption === '$45,001 - $120,000' ? '$5,092 + 32.5% of excess over $45,000' :
                              incomeOption === '$120,001 - $180,000' ? '$29,467 + 37% of excess over $120,000' :
                                incomeOption === '$180,001+' ? '$51,667 + 45% of excess over $180,000' : '0%'
                      }
                    </Typography>
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