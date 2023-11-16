import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {
    title: string;
    val: string;
    color: string;
    currSymbole?: string;
    loading?: boolean;
}

const customStyle = {
    display: 'flex',
    flexDirection: 'column',
    paddingY: '20px',
    gap: '8px',
    textAlign: 'center',
    borderRadius: '8px',
    marginX: {xs: '5%', sm: '0'},
    // alignItems: 'center',
    // gap: '1rem',
    // padding: '1rem',
    // borderRadius: '8px',
    // backgroundColor: 'white',
}


function ResultBox({title, val, color, currSymbole, loading}: Props) {
  return (
    <Box sx={{...customStyle, backgroundColor: color+'.light'}}>
        <Typography variant='h5' fontWeight={500} color="initial">
            {title}
        </Typography>
        <Typography variant='h3' color={color+'.dark'} fontWeight={700}>
            {loading ? 'Loading..' :(currSymbole + ' ' + val)}
        </Typography>
    </Box>
  )
}

export default ResultBox