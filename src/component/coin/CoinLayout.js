import { Box, Button, Chip, Divider, Grid, Typography } from '@mui/material';
import { formatCurrency, formatNum } from '../header/GlobalData';
import { Link } from 'react-router-dom';

export const CoinMarketDataLayout = ({ title, num, type }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <Grid item>
        <Typography color={'grey'}>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography fontWeight={'bold'}>
          {type === 'currency' ? formatCurrency(num, 0, false) : formatNum(num, 0, false)}
        </Typography>
      </Grid>

    </Grid>

  );
}

export const CoinInfoURL = ({ title, name, link }) => {

  const handleClick = () =>{
    window.location.href = link;
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Grid item>
        {title}
      </Grid>

      <Grid item>
        <Chip label={name} onClick={handleClick} />
      </Grid>

    </Grid>
  )
}
