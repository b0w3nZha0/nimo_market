import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinPage } from '../config/api';
import { Chip, Container, Grid, Stack, Typography } from '@mui/material';
import CoinInfo from '../component/coin/CoinInfo';
import axios from 'axios';
import { formatCurrency } from '../component/header/GlobalData';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


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
          <Grid item xs={12} md={8}>
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
                <img src={coin?.image.large} alt={coin?.name} height='30' />
                <Typography component="div" variant='h5'>
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
                  {priceChangeH >= 0 ? <ArrowDropUpIcon fontSize='large'/> : <ArrowDropDownIcon fontSize='large'/>}
                  <Typography variant='h5'>
                    {Math.abs(priceChangeH).toFixed(2)}%
                  </Typography>
                </Stack>


              </Stack>

            </Container>
            
            {/* Circulating supply */}
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                
              </Grid>
              

            </Grid>
            
            {/* market data */}
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>

              </Grid>
              
              <Grid item xs={12} lg={6}>

              </Grid>

            </Grid>




          </Grid>
          
          {/* right column, info */}
          <Grid item xs={12} lg={4}>
            bbbbbbbb
          </Grid>
        </Grid>

      </Grid>



      <CoinInfo coin={coin} />
    </Container>



  )

}

export default CoinDetails;