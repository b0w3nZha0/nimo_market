import * as React from 'react';
import { useState, useEffect } from 'react';
import { CoinsMarket } from '../../config/api';
import axios from 'axios';
import { Container } from '@mui/system';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    IconButton,
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
import { formatCurrency, formatNum } from '../header/GlobalData';
import { SparkLineChart } from '@mui/x-charts';
import styled from '@emotion/styled';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import MockMarketData from '../../MockMarketData.json';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Display coins market data in table with pagination
const CoinsTable = () => {
    const navigate = useNavigate();

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pinList, setPinList] = useState([]);

    useEffect(() => {
        fetchCoinsTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const fetchCoinsTable = async () => {
        try {
            setLoading(true);
            //const res = await axios.get(CoinsMarket(100, page));
            //const res = await axios.get();
            //const data = res.data;
            console.log(MockMarketData);
            setCoins(MockMarketData);
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

    const handlePinCheckedEvent = (e, coin) => {
        e.stopPropagation();
        if (!pinList.includes(coin)) {
            setPinList((prev) => [...prev, coin]);
            console.log('coin pushed');
        } else {
            const newList = pinList.filter((currCoin) => currCoin !== coin)
            setPinList(newList);
            console.log('coin removed');
        }
    }
    console.log(pinList);

    // const pinListEvent = (id) =>{
    //     setPinList((pinList) => [...pinList, id])
    //     return(
    //         <PushPinIcon />
    //     )
    // }

    return (
        <Container style={{ textAlign: 'center' }} maxWidth='lg'>
            <Typography variant='h4' style={{ margin: 20 }} fontWeight={'bold'}>
                Cryptocurrency Prices by Market Cap
            </Typography>

            <Divider />

            {/* display table if api is valid, otherwise show loading icon */}
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
                            page={page}
                            showFirstButton
                            showLastButton
                            onChange={(e, value) => {
                                setPage(value);
                                window.scroll(0, 450);
                                console.log(value);
                            }}
                        />

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 1, md: 4 }}
                        >
                            {pinList.map((coin) => {
                                return (

                                    <Card sx={{ maxWidth: 200, maxHeight: 75 }} key={coin.name}>
                                        <CardHeader
                                            avatar={<img src={coin.image} alt={coin.name} height='20' />}
                                            action={
                                                <IconButton aria-label="settings" onClick={(e) => handlePinCheckedEvent(e, coin)}>
                                                    <CloseIcon />
                                                </IconButton>
                                            }
                                            title={`${coin.name} ${coin.symbol}`}
                                            sx={{ padding: 1, paddingBottom: 0 }}
                                        />
                                        <CardContent sx={{ padding: 1, paddingTop: 0 }}>
                                            <Box sx={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-evenly',
                                                minWidth: 'md',
                                                display: 'flex',
                                                mr: 1,
                                            }}>
                                                <Typography variant='body2'>
                                                    24h Vol:
                                                </Typography>

                                                <Stack
                                                    direction="row"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    spacing={1}
                                                    style={{
                                                        color:
                                                            coin.price_change_percentage_24h_in_currency > 0
                                                                ? 'rgb(14, 203, 129)'
                                                                : 'red',
                                                    }}
                                                >
                                                    {coin.price_change_percentage_24h_in_currency >= 0
                                                            ? <TrendingUpIcon />
                                                            : <TrendingDownIcon />}
                                                    <Typography >
                                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                                    </Typography>

                                                </Stack>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                )
                            })
                            }

                        </Stack>

                        {/* Table section */}
                        <Table>

                            {/* Table header */}
                            <TableHead>
                                <TableRow>
                                    {[
                                        'Pin',
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
                                            align={head === 'Coin' ? 'left' : 'right'}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            {/* Table body */}
                            <TableBody>
                                {coins.map((coin) => {


                                    return (
                                        <TableRow
                                            onClick={() => navigate(`/coin/${coin.id}`)}
                                            className={coin.id}
                                            key={coin.name}
                                        >
                                            {/* Pin coin for overview*/}
                                            <StyledTableCell>
                                                <IconButton onClick={(e) => handlePinCheckedEvent(e, coin)}>
                                                    {pinList?.includes(coin) ? <PushPinIcon />
                                                        : <PushPinOutlinedIcon />}
                                                </IconButton>
                                            </StyledTableCell>


                                            {/* Market cap rank */}
                                            <StyledTableCell align='right'>
                                                <Typography>{coin.market_cap_rank}</Typography>
                                            </StyledTableCell>

                                            {/* Coin's icon, name and symbol */}
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

                                            {/* Coin's current price */}
                                            <StyledTableCell align='right'>
                                                {formatCurrency(coin.current_price, 2, true)}
                                            </StyledTableCell>

                                            {/* Coin's 1h price change percentage */}
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

                                            {/* Coin's 24h price change percentage */}
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

                                            {/* Coin's 7d price change percentage */}
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

                                            {/* Coin's market cap */}
                                            <StyledTableCell align='right'>
                                                {formatCurrency(coin.market_cap, 0, false)}
                                            </StyledTableCell>

                                            {/* Coin's total volume */}
                                            <StyledTableCell align='right'>
                                                {formatCurrency(coin.total_volume, 0, false)}
                                            </StyledTableCell>

                                            {/* Coin's chart of price change in 7d */}
                                            <StyledTableCell align='right' width={'150'}>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <SparkLineChart
                                                        data={coin.sparkline_in_7d.price}
                                                        height={60}
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
