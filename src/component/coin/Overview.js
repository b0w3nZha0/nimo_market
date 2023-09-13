import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinPage } from '../../config/api';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Markup } from 'interweave';
import { formatNum } from '../header/GlobalData';
import { CoinOverviewCard, PlaceHolder } from './CoinLayout';

const Overview = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    try {
      const res = await axios.get(CoinPage(id));
      const data = res.data
      console.log(data);
      setCoin(data);

    } catch (err) {
      console.log(`Error fetching ${id} coin details: ` + err);
    }
  }

  useEffect(() => {
    fetchCoin();
  }, [])

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid item marginBottom={5}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontWeight={'bold'}>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Markup content={coin?.description.en} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item marginBottom={5}>
        <Grid container
          direction="row"
          justifyContent="space-between"
          alignItems="center">

          <CoinOverviewCard
            title='Community Data'
            num={coin?.community_data.twitter_followers}
            text='Twitter Followers'
          />

          <CoinOverviewCard
            title='Developer Data'
            num={coin?.developer_data.forks}
            text='Forks'
          />

          <CoinOverviewCard
            title='Developer Data'
            num={coin?.developer_data.stars}
            text='Stars'
          />

          <CoinOverviewCard
            title='Developer Data'
            num={coin?.developer_data.subscribers}
            text='Subscribers'
          />

          <CoinOverviewCard
            title='Developer Data'
            num={coin?.developer_data.total_issues}
            text='Total issues'
          />

          <CoinOverviewCard
            title='Developer Data'
            num={coin?.developer_data.commit_count_4_weeks}
            text='Commit count 4 weeks'
          />

        </Grid>
      </Grid>

      <Grid item marginBottom={5}>
        <PlaceHolder />
        <PlaceHolder />


      </Grid>

    </Grid>
  )
}

export default Overview