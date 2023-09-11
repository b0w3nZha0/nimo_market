import * as React from 'react';
import { useState, useEffect } from 'react';
import { CoinsMarket } from '../config/api';
import axios from 'axios';
import { Container } from '@mui/system';
import { Box, Divider, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, makeStyles } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../header/GlobalData';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SparkLineChart } from '@mui/x-charts';


const CoinsTable = () => {

    const navigate = useNavigate();

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchCoinsTable();
    }, []);


    const fetchCoinsTable = async () => {
        try {
            setLoading(true);
            const res = await axios.get(CoinsMarket);
            const data = res.data;
            console.log(data);
            setCoins(data);
            console.log(coins);
            setLoading(false);

        } catch (err) {
            console.log('Error fetching coins data: ' + err);
        }
    };

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    };

    

    return (
        <Container style={{ textAlign: 'center' }}>
            <Typography variant='h4' style={{ margin: 20 }}>
                Cryptocurrency Prices by Market Cap
            </Typography>

            <TextField style={{ marginBottom: 20, width: '100%' }}
                label='Search Crypto Currency ...' variant='outlined'
            />

            <Divider />
            <TableContainer>
                {
                    loading ? (
                        <LinearProgress />
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {['#', 'Coin', 'Price', '1h', '24h', '7d', 'Market Cap', 'Volume', 'Last 7 Days'].map((head) => (
                                        <TableCell
                                            key={head}
                                            align={head === 'Coin' ? '' : 'right'}
                                        >
                                            {head}
                                        </TableCell>
                                    ))
                                    }
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {handleSearch().map(coin => {

                                    return (
                                        <TableRow
                                            onClick={() => navigate(`/coin/${coin.id}`)}
                                            className={coin.id}
                                            keu={coin.name}
                                        >
                                            <TableCell align='right'>
                                                <Typography>
                                                    {coin.market_cap_rank}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                component='th'
                                                scope='row'
                                                styles={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <div style={{ display: 'inline-flex', alignSelf: 'center'}}>
                                                    <img
                                                        src={coin?.image}
                                                        alt={coin.name}
                                                        height='20'
                                                    />
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}
                                                    >
                                                        <span>
                                                            {coin.name}
                                                        </span>
                                                        <span
                                                            style={{
                                                                textTransform: "uppercase",
                                                                color: "darkgrey"
                                                            }}
                                                        >
                                                            {coin.symbol}
                                                        </span>

                                                    </div>
                                                </div>

                                            </TableCell>

                                            <TableCell align='right'>
                                                {formatCurrency(coin.current_price, 2, true)}
                                            </TableCell>

                                            <TableCell
                                                align="right"
                                                style={{
                                                    color: coin.price_change_percentage_1h_in_currency > 0 ? "rgb(14, 203, 129)" : "red",
                                                }}
                                            >
                                                <span>
                                                    {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                                                </span>
                                            </TableCell>

                                            <TableCell
                                                align="right"
                                                style={{
                                                    color: coin.price_change_percentage_24h_in_currency > 0 ? "rgb(14, 203, 129)" : "red",
                                                }}
                                            >
                                                <span>
                                                    {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                                                </span>
                                            </TableCell>

                                            <TableCell
                                                align="right"
                                                style={{
                                                    color: coin.price_change_percentage_7d_in_currency > 0 ? "rgb(14, 203, 129)" : "red",
                                                }}
                                            >
                                                <span>
                                                    {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
                                                </span>
                                            </TableCell>

                                            <TableCell align='right'>
                                                {formatCurrency(coin.market_cap, 0, false)}
                                            </TableCell>

                                            <TableCell align='right'>
                                                {formatCurrency(coin.total_volume, 0, false)}
                                            </TableCell>

                                            <TableCell align='left'>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <SparkLineChart data={coin.sparkline_in_7d.price} height={'55'}/>
                                                </Box>

                                            </TableCell>


                                        </TableRow>
                                    )
                                })}
                            </TableBody>


                        </Table>
                    )
                }
            </TableContainer>


        </Container>
    )

}

export default CoinsTable;