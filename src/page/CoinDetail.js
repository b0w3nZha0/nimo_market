import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinPage } from '../config/api';
import { Box, Button, Chip, Container, Divider, Grid, LinearProgress, Link, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { formatCurrency, formatNum } from '../component/header/GlobalData';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CoinInfoURL, CoinMarketDataLayout } from '../component/coin/CoinLayout';
import HistoryChart from '../component/coin/HistoryChart';


const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [coinPrice, setCoinPrice] = useState(0);
  const [priceChangeH, setPriceChangeH] = useState(0);

  const fetchCoin = async () => {
    try {
      const res = await axios.get(CoinPage(id));
      const data = res.data
      console.log(data);
      setCoin(data);
      setCoinPrice(data.market_data.current_price.usd);
      setPriceChangeH(data.market_data.price_change_percentage_1h_in_currency.usd);

    } catch (err) {
      console.log(`Error fetching ${id} coin details: ` + err);
    }
  }

  useEffect(() => {
    fetchCoin();
  }, [])



  return (
    <Container>
      {/* page layout  */}
      <Grid
        container
        direction='column'
        justifyContent='flex-start'
        alignItems='center'
      >
        {/* coin's basic data & info */}
        <Grid container spacing={2} >
          {/* left colum, basic data */}
          <Grid item xs={12} lg={8}>
            <Container>
              <Chip
                size="small"
                variant="outlined"
                color="warning"
                label={`Rank #${coin?.market_cap_rank}`}
              />
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                <img src={coin?.image.large} alt={coin?.name} height='40' />
                <Typography component="div" variant='h5' fontWeight={'bold'}>
                  {coin?.name}
                </Typography>
                <Typography variant='h5' style={{
                  textTransform: 'uppercase',
                  color: 'darkgrey',
                }}>
                  {coin?.symbol}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Typography variant='h4'>
                  {formatCurrency(coinPrice, 2, true)}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0}
                  style={{
                    color:
                      priceChangeH >= 0
                        ? 'rgb(14, 203, 129)'
                        : 'red',
                  }}
                >
                  {priceChangeH >= 0 ? <ArrowDropUpIcon fontSize='large' /> : <ArrowDropDownIcon fontSize='large' />}
                  <Typography variant='h5'>
                    {Math.abs(priceChangeH).toFixed(2)}%
                  </Typography>
                </Stack>
              </Stack>

              {/* Circulating supply */}
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                  {/* title */}
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography color={'grey'}>
                        Circulating supply ({formatNum(coin?.market_data.circulating_supply / coin?.market_data.total_supply * 100, 2, false)}%)
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography fontWeight={'bold'}>
                        {formatNum(coin?.market_data.circulating_supply, 0, false)}
                      </Typography>
                    </Grid>

                  </Grid>

                  {/* progress bar */}
                  <Box>
                    <LinearProgress
                      color='warning'
                      variant="determinate"
                      value={50}
                    />
                  </Box>

                  {/* description */}
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography color={'grey'}>
                        Total supply: {formatNum(coin?.market_data.total_supply, 0, false)}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography color={'grey'}>
                        Total supply: {formatNum(coin?.market_data.total_supply, 0, false)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* market data */}
              <Grid container spacing={2}>
                {/* left column */}
                <Grid item xs={12} lg={6}>
                  <CoinMarketDataLayout
                    title={'Market Cap'}
                    num={coin?.market_data.market_cap.usd}
                    type={'currency'}
                  />
                  <Divider />

                  <CoinMarketDataLayout
                    title={'24 Hour Trading Vol'}
                    num={coin?.market_data.total_volume.usd}
                    type={'currency'}
                  />
                  <Divider />

                  <CoinMarketDataLayout
                    title={'Fully Diluted Valuation'}
                    num={coin?.market_data.fully_diluted_valuation.usd}
                    type={'currency'}
                  />
                  <Divider />
                </Grid>

                {/* right column */}
                <Grid item xs={12} lg={6}>
                  <CoinMarketDataLayout
                    title={'24 Hour Volume High'}
                    num={coin?.market_data.high_24h.usd}
                    type={'currency'}
                  />
                  <Divider />

                  <CoinMarketDataLayout
                    title={'24 Hour Volume Low'}
                    num={coin?.market_data.low_24h.usd}
                    type={'currency'}
                  />
                  <Divider />

                  <CoinMarketDataLayout
                    title={'Watchlist Users'}
                    num={coin?.watchlist_portfolio_users}
                  />
                  <Divider />
                </Grid>
              </Grid>
            </Container>
          </Grid>

          {/* right column, info */}
          <Grid item xs={12} lg={4}>
            <Container>

              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
                sx={{ display: { xs: 'flex', md: 'flex' } }}
              >
                <Typography variant='h5' fontWeight={'bold'}>
                  Global Bitcoin Prices
                </Typography>

                <CoinInfoURL
                  title={'Website'}
                  name={'Homepage'}
                  link={coin?.links.homepage[0]}
                />

                <CoinInfoURL
                  title={'Explorers'}
                  name={'Blockchain'}
                  link={coin?.links.blockchain_site[0]}
                />

                <CoinInfoURL
                  title={'Community'}
                  name={'Offical Forum'}
                  link={coin?.links.official_forum_url[0]}
                />

                <CoinInfoURL
                  title={'Source Code'}
                  name={'Github'}
                  link={coin?.links.official_forum_url[0]}
                />

                <CoinInfoURL
                  title={'Blog'}
                  name={'Reddit'}
                  link={coin?.links.subreddit_url}
                />

                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Grid item>
                    Wallets
                  </Grid>

                  <Grid item>
                    <Chip 
                      label='Ledger' 
                      onClick={() => 
                        window.location.href = 
                        'https://shop.ledger.com/pages/ledger-nano-x?utm_source=CoinGecko&utm_campaign=ADS-wallet&utm_medium=affiliate_button&r=bafa'
                      } 
                    />
                    <Chip 
                      label='Electrum' 
                      onClick={() => 
                        window.location.href = 
                        'https://electrum.org/'
                      } 
                    />
                    <Chip 
                      label='Xdefi' 
                      onClick={() => 
                        window.location.href = 
                        'https://www.xdefi.io/'
                      } 
                    />
                    
                  </Grid>

                </Grid>



              </Stack>

              {/* <Button variant="contained" fullWidth='true' sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Typography textTransform={'none'} >
                  Read more
                </Typography>
              </Button> */}
            </Container>

          </Grid>
        </Grid>

        <Grid container spacing={2} >
          <HistoryChart />
        </Grid>

      </Grid>

    </Container>



  )

}

export default CoinDetails;