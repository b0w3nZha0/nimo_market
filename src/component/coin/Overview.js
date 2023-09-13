import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { Markup } from 'interweave';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinPage } from '../../config/api';
import { CoinOverviewCard, PlaceHolder } from './CoinLayout';

// Overview section under chart on detail page 
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
    >
      {/* Coin's description (from API) */}
      <Grid item marginBottom={5}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontWeight={'bold'}>Description</Typography>
          </AccordionSummary>

          {/* Using Markup to convert <a> into link within text */}
          <AccordionDetails>
            <Typography>
              <Markup content={coin?.description.en} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* Coin's community and developer data */}
      <Grid item marginBottom={5}>
        <Grid container
          direction="row"
          justifyContent="space-between"
          alignItems="center">

          {/* Community data, twitter followers */}
          <CoinOverviewCard
            title='Community Data'
            num={coin?.community_data.twitter_followers}
            text='Twitter Followers'
          />

          {/* Developer data, github forks */}
          <CoinOverviewCard
            title='Developer Data'
            num={coin?.developer_data.forks}
            text='Forks'
          />

          {/* Developer data, github stars */}
          <CoinOverviewCard
            title='Developer Data'
            num={coin?.developer_data.stars}
            text='Stars'
          />

          {/* Developer data, github subscribers */}
          <CoinOverviewCard
            title='Developer Data'
            num={coin?.developer_data.subscribers}
            text='Subscribers'
          />

          {/* Developer data, github total issues rised*/}
          <CoinOverviewCard
            title='Developer Data'
            num={coin?.developer_data.total_issues}
            text='Total issues'
          />

          {/* Developer data, github commit within past 4 weeks */}
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