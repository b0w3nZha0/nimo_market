import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Card, CardContent, Chip, Grid, Skeleton, Typography } from '@mui/material';
import { formatCurrency, formatNum } from '../header/GlobalData';

// Coin data section on deatils page.
// title: name of data
// num: value of data
// type: 'currency' or 'number'
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

// Generate chip link at information section on detail page
// title: parent group of link 
// name: summary of link
// link: external URL from API
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

// Display community/developer data as card on detail page
// title: data type (community/developer)
// num: value of data
// text: description of data
export const CoinOverviewCard = ({ title, num, text }) => {
  return (
    <Grid item xs={6} lg={4} container
      direction="row"
      justifyContent="center"
      alignItems="center">
      <Card sx={{ minWidth: 300, marginBottom: 2 }} variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant={'h4'} fontWeight={'bold'} sx={{ mb: 1.5 }}>
            {text === 'Twitter Followers'
              ? (<TwitterIcon color='primary' fontSize='large' />)
              : (<GitHubIcon fontSize='large' />)}

            {formatNum(num, 0, false)}
          </Typography>

          <Typography fontWeight={'bold'} fontStyle={'italic'}>
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

  )
}

export const PlaceHolder = () => {
  return (
    <Box>
      <Skeleton height={500} />
    </Box>
  )
}
