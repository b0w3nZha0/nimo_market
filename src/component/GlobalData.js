import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';

const GlobalData = () => {

    const [globalData, setGlobalData] = React.useState(null);


    const fetchGlobalData = () => {
        axios.get('https://api.coingecko.com/api/v3/global')
        .then(res => {
            setGlobalData(res.data.data)
        }).catch(err => {
            console.log(err)
        })
        
    }

    useEffect(() => {
        fetchGlobalData()
    }, [])

    return(
        <Container maxWidth="xl">
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                <Typography>Cryptos: {globalData.active_cryptocurrencies} </Typography>
            </Box>
            
        </Container>
    )
}

export default GlobalData;