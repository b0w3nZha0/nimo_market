import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';

const GlobalData = () => {
    const [globalData, setGlobalData] = React.useState([]);
    const [marketCap, setMarketCap] = React.useState([]);
    const [volume, setVolume] = React.useState([]);

    useEffect(() => {
        fetchGlobalData();
    }, []);

    const fetchGlobalData = async () => {
        try {
            const res = await axios.get('https://api.coingecko.com/api/v3/global');
            const data = await res.data.data;
            setGlobalData(data);
            setMarketCap(data.total_market_cap);
            setVolume(data.total_volume);
        } catch (err) {
            console.log('Error fetching global data: ' + err);
        }
    };

    const formatCurrency = (num) => {
        return (
            <CurrencyFormat
                value={num}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={0}
            />
        );
    };

    return (
        <Container maxWidth='xl' >
            <Box
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    minWidth: 'md',
                    display: 'flex',
                    mr: 1,
                }}
            >
                <Typography>Cryptos: {globalData.active_cryptocurrencies}</Typography>

                <Typography>Exchanges: {globalData.markets}</Typography>

                <Typography>Market Cap: {formatCurrency(marketCap.usd)}</Typography>

                <Typography>24h Vol: {formatCurrency(volume.usd)}</Typography>
            </Box>
        </Container>
    );
};

export default GlobalData;
