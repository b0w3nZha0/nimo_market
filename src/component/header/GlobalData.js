import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import { useState } from 'react';
import { GlobalCoinsData } from '../../config/api';

export const formatCurrency = (num, decimal, fixed) => {
    return (
        <CurrencyFormat
            value={num}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={decimal}
            fixedDecimalScale={fixed}
        />
    );
};

export const formatNum = (num, decimal, fixed) => {
    return (
        <CurrencyFormat
            value={num}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={decimal}
            fixedDecimalScale={fixed}
        />
    );
};

const GlobalData = () => {
    const [globalData, setGlobalData] = useState([]);
    const [marketCap, setMarketCap] = useState([]);
    const [volume, setVolume] = useState([]);

    useEffect(() => {
        fetchGlobalData();
    }, []);

    const fetchGlobalData = async () => {
        try {
            const res = await axios.get(GlobalCoinsData);
            const data = await res.data.data;
            setGlobalData(data);
            console.log(data)
            setMarketCap(data.total_market_cap);
            setVolume(data.total_volume);
        } catch (err) {
            console.log('Error fetching global data: ' + err);
        }
    };

    return (
        <Container maxWidth='lg' >
            <Box
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    minWidth: 'md',
                    display: 'flex',
                    mr: 1,
                }}
            >
                <Typography>
                    Crypto: {globalData.active_cryptocurrencies}
                </Typography>

                <Typography>Exchanges: {globalData.markets}</Typography>

                <Typography>Market Cap: {formatCurrency(marketCap.usd, 0, false)} </Typography>
   
                <Typography>24h Vol: {formatCurrency(volume.usd, 0, false)}</Typography>
            </Box>
        </Container>
    );
};

export default GlobalData;
