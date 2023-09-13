import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import { useState } from 'react';
import { GlobalCoinsData } from '../../config/api';

// Function to format the num to currency
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

// Function to format the num with separator
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

// Locate at the top of screen, show global market data
const GlobalData = () => {

    const [globalData, setGlobalData] = useState([]);
    const [marketCap, setMarketCap] = useState([]);
    const [volume, setVolume] = useState([]);

    useEffect(() => {
        fetchGlobalData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Container maxWidth='xl' >
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={3}
            >
                {/* Total number of crypto currencies */}
                <Box sx={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    minWidth: 'md',
                    display: 'flex',
                    mr: 1,
                }}>
                    <Typography>
                        Crypto:
                    </Typography>

                    <Typography color={'primary'}>
                        {globalData.active_cryptocurrencies}
                    </Typography>
                </Box>

                {/* Total market exchange */}
                <Box sx={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    minWidth: 'md',
                    display: 'flex',
                    mr: 1,
                }}>
                    <Typography>
                        Exchanges:
                    </Typography>

                    <Typography color={'primary'}>
                        {globalData.markets}
                    </Typography>
                </Box>

                {/* Total market cap */}
                <Box sx={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    minWidth: 'md',
                    display: 'flex',
                    mr: 1,
                }}>
                    <Typography>
                        Market Cap:
                    </Typography>

                    <Typography color={'primary'}>
                        {formatCurrency(marketCap.usd, 0, false)}
                    </Typography>
                </Box>

                {/* Volume within past 24h */}
                <Box sx={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    minWidth: 'md',
                    display: 'flex',
                    mr: 1,
                }}>
                    <Typography>
                        24h Vol:
                    </Typography>

                    <Typography color={'primary'}>
                        {formatCurrency(volume.usd, 0, false)}
                    </Typography>
                </Box>
            </Stack>
        </Container>
    );
};

export default GlobalData;
