import { East } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import advertImage from '../public/frame.png'

type Props = {
    windowSize: string;
}

export default function Advert({ windowSize }: Props) {
    return (
        <>
            {windowSize === 'big' ? <Box sx={{ // advert box for big screen
                borderRadius: 8,
                aspectRatio: { md: '0.8', xs: '2' },
                backgroundColor: 'blue.main',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
                padding: {
                    xs: '2rem 1rem',
                    sm: '2rem 1rem',
                    md: '4rem 2rem',
                },
            }}>
                <Box sx={{ // advert box text
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    textAlign: 'center',
                }}>
                    <Typography variant='h3' fontWeight={700} color="white" textAlign='center'>Get Started with KoinX for FREE</Typography>
                    <Typography variant='h5' fontWeight={400} color="white" textAlign='center'>With our range of features that you can equip for free, KoinX allows you to be more educated and aware of your tax reports.</Typography>
                </Box>
                <Image src={advertImage} alt='illustration' width={200} height={200} />
                <Button
                    variant="contained"
                    disableTouchRipple
                    disableRipple
                    sx={{
                        backgroundColor: 'white',
                        color: 'gray.dark',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        padding: '0.5rem 1rem',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'gray.dark',
                        },
                    }}>
                    Get Started for free
                    <East fontSize='small' />
                </Button>
            </Box> : <Box sx={{ // advert for small screen
                borderRadius: 8,
                aspectRatio: { md: '0.8', xs: '2' },
                backgroundColor: 'blue.main',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
                padding: {
                    xs: '2rem 1rem',
                    sm: '2rem 1rem',
                    md: '4rem 2rem',
                },
            }}>
                <Image src={advertImage} alt='illustration' width={200} height={200} />
                <Box sx={{ // advert box text
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    textAlign: 'center',
                }}>
                    <Typography variant='h3' fontWeight={700} color="white" textAlign='center'>Track your portfolio & taxes</Typography>
                    <Typography variant='h5' fontWeight={400} color="white" textAlign='center'>With our range of features that you can equip for free, KoinX allows you to be more educated and aware of your tax reports.</Typography>
                </Box>
                <Button
                    variant="contained"
                    disableTouchRipple
                    disableRipple
                    sx={{
                        backgroundColor: 'white',
                        color: 'gray.dark',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        padding: '0.5rem 1rem',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'gray.dark',
                        },
                    }}>
                    Get Started for free
                    <East fontSize='small' />
                </Button>
            </Box>}
        </>
    )
}