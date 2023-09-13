import { Box, Button, Card, CardContent, Chip, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { formatCurrency, formatNum } from '../header/GlobalData';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

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

  const handleClick = () => {
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

export const CoinOverviewCard = ({title, num, text}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant={'h4'} fontWeight={'bold'} sx={{ mb: 1.5 }}>
          { text === 'Twitter Followers' 
            ? (<TwitterIcon color='primary' fontSize='large' />) 
            : (<GitHubIcon fontSize='large' />)}
          
          {formatNum(num, 0, false)}
        </Typography>

        <Typography fontWeight={'bold'} fontStyle={'italic'}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  )
}

export const PlaceHolder = () => {
  return(
    <Box>
      <Skeleton height={500}/>
    </Box>
  )
}