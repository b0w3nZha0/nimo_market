import * as React from 'react';
import { useState, useEffect } from 'react';
import { CoinsMarket } from '../../config/api';
import axios from 'axios';
import { Container } from '@mui/system';
import {
    Box,
    Divider,
    LinearProgress,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../header/GlobalData';

import { SparkLineChart } from '@mui/x-charts';
import styled from '@emotion/styled';

const CoinsTable = () => {
    const navigate = useNavigate();

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState('1');

    useEffect(() => {
        fetchCoinsTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const fetchCoinsTable = async () => {
        try {
            setLoading(true);
            //const res = await axios.get(CoinsMarket(100, page));
            const res = await axios.get();
            const data = res.data;
            console.log(data);
            setCoins(data);
            console.log(coins);
            setLoading(false);
        } catch (err) {
            console.log('Error fetching coins data: ' + err);
        }
    };

    const StyledTableCell = styled(TableCell)({
        paddingTop: 0,
        paddingBottom: 0,
    });

    return (
        <Container style={{ textAlign: 'center' }} maxWidth='lg'>
            <Typography variant='h4' style={{ margin: 20 }} fontWeight={'bold'}>
                Cryptocurrency Prices by Market Cap
            </Typography>



            <Divider />
            <TableContainer>
                {loading ? (
                    <LinearProgress />
                ) : (
                    <Box>
                        <Pagination
                            style={{
                                padding: 20,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            count={100}
                            showFirstButton
                            showLastButton
                            onChange={(e, value) => {
                                setPage(value);
                                window.scroll(0, 450);
                                console.log(value);
                            }}
                        />
                        <Table>

                            <TableHead>
                                <TableRow>
                                    {[
                                        '#',
                                        'Coin',
                                        'Price',
                                        '1h',
                                        '24h',
                                        '7d',
                                        'Market Cap',
                                        'Volume',
                                        'Last 7 Days',
                                    ].map((head) => (
                                        <TableCell
                                            key={head}
                                            align={head === 'Coin' ? '' : 'right'}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>


                                {coins.map((coin) => {
                                    return (
                                        <TableRow
                                            onClick={() => navigate(`/coin/${coin.id}`)}
                                            className={coin.id}
                                            key={coin.name}
                                        
                                        >
                                            <StyledTableCell align='right'>
                                                <Typography>{coin.market_cap_rank}</Typography>
                                            </StyledTableCell>

                                            <StyledTableCell
                                                component='th'
                                                scope='row'
                                                styles={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <Stack
                                                    direction="row"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <img src={coin.image} alt={coin.name} height='20' />
                                                    <Typography fontWeight={'bold'}>
                                                        {coin.name}
                                                    </Typography>
                                                    <Typography textTransform={'uppercase'} color={'grey'}>
                                                        {coin.symbol}
                                                    </Typography>
                                                </Stack>

                                            </StyledTableCell>

                                            <StyledTableCell align='right'>
                                                {formatCurrency(coin.current_price, 2, true)}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align='right'
                                                style={{
                                                    color:
                                                        coin.price_change_percentage_1h_in_currency > 0
                                                            ? 'rgb(14, 203, 129)'
                                                            : 'red',
                                                }}
                                            >
                                                <span>
                                                    {coin.price_change_percentage_1h_in_currency?.toFixed(2)}
                                                    %
                                                </span>
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align='right'
                                                style={{
                                                    color:
                                                        coin.price_change_percentage_24h_in_currency > 0
                                                            ? 'rgb(14, 203, 129)'
                                                            : 'red',
                                                }}
                                            >
                                                <span>
                                                    {coin.price_change_percentage_24h_in_currency?.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </span>
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align='right'
                                                style={{
                                                    color:
                                                        coin.price_change_percentage_7d_in_currency > 0
                                                            ? 'rgb(14, 203, 129)'
                                                            : 'red',
                                                }}
                                            >
                                                <span>
                                                    {coin.price_change_percentage_7d_in_currency?.toFixed(2)}
                                                    %
                                                </span>
                                            </StyledTableCell>

                                            <StyledTableCell align='right'>
                                                {formatCurrency(coin.market_cap, 0, false)}
                                            </StyledTableCell>

                                            <StyledTableCell align='right'>
                                                {formatCurrency(coin.total_volume, 0, false)}
                                            </StyledTableCell>

                                            <StyledTableCell align='left'>
                                                <Box sx={{flexGrow: 1}}>
                                                    <SparkLineChart
                                                        data={coin.sparkline_in_7d.price}
                                                        height={'60'}
                                                    />
                                                </Box>


                                            </StyledTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Box>

                )}
            </TableContainer>




        </Container>
    );
};

export default CoinsTable;
