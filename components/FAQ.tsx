import { Box, Typography, useMediaQuery } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
import { faqAnswers, faqQuestions } from '../utils/staticStrings'

type Props = {}

function FAQ({}: Props) {
  return (
    <Box sx={{ // faq section
        borderRadius: 8,
        padding: '5%',
        backgroundColor: 'white',
        border: { xs: '2px solid', md: 'none' },
        borderColor: { xs: 'gray.A100' },
      }}>
        <Typography variant='h3' sx={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '35px' }}>Frequently Asked Questions</Typography> {/* title */}
        <Grid2 container rowSpacing={{ xs: '20px', sm: '28px' }} columnSpacing={'40px'}> {/* input boxes */}
          {// if screen size is small then show only 2 question
          faqQuestions.slice(0, useMediaQuery('(max-width:900px)') ? 2 : faqQuestions.length).map((question, index) => (
            <Grid2 xs={12} key={index}>
              <Typography variant='h4' fontWeight={700} color="#0B1426" marginBottom={'5px'}>{question}</Typography>
              <Typography variant='body1' fontWeight={400} color="gray.main" marginBottom={'5px'}>{faqAnswers[index]}</Typography>
            </Grid2>
          ))}
        </Grid2>
      </Box>
  )
}

export default FAQ