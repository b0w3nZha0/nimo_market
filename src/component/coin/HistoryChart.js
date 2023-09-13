import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HisotryData } from '../../config/api';
import axios from 'axios';
import { Box, CircularProgress, Container, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment/moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HistoryChart = () => {
  const { id } = useParams();
  const [historyData, setHistoryData] = useState();
  const [days, setDays] = useState('1');

  const fetchHistoryData = async () => {
    try {
      const res = await axios.get(HisotryData(id, days));
      const data = res.data.prices;
      console.log(data);
      const coinChartData = data.map(
        val => ({ x: val[0], y: val[1].toFixed(8) }));
      console.log(coinChartData);
      setHistoryData(coinChartData);
    } catch (err) {
      console.log(`Error fetching ${id} coin history data: ` + err);
    }
  }

  useEffect(() => {
    fetchHistoryData();
  }, [days])

  const chartOptions = {
    responsive: true
  }

  const chartData = {
    labels: days === '1' ? historyData?.map(val => moment(val.x).format('LT'))
      : days < 365 ? historyData?.map(val => moment(val.x).format('Do MMM'))
        : historyData?.map(val => moment(val.x).format('MMM YY')),
    datasets: [
      {
        fill: true,
        label: id.toUpperCase(),
        data: historyData?.map(val => val.y),
        borderColor: 'rgb(241, 127, 41)',
        backgroundColor: 'rgba(241, 127, 41, 0.5)',
      }
    ]
  }

  const handleDaysChange = (e, newDays) => {
    setDays(newDays);
  };


  return (
    <Box>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant='h4'>
              {id.toUpperCase()} Price Chart
            </Typography>
          </Grid>

          <Grid item>
          <ToggleButtonGroup
          value={days}
          onChange={handleDaysChange}
          exclusive
        >
          <ToggleButton value='1' aria-label='24h history'>
            24h
          </ToggleButton>
          <ToggleButton value='7' aria-label='7d history'>
            7d
          </ToggleButton>
          <ToggleButton value='14' aria-label='14d history'>
            14d
          </ToggleButton>
          <ToggleButton value='30' aria-label='30d history'>
            30d
          </ToggleButton>
          <ToggleButton value='90' aria-label='90d history'>
            90d
          </ToggleButton>
          <ToggleButton value='180' aria-label='180d history'>
            180d
          </ToggleButton>
          <ToggleButton value='365' aria-label='1y history'>
            1y
          </ToggleButton>
          <ToggleButton value='max' aria-label='Max history'>
            Max
          </ToggleButton>
        </ToggleButtonGroup>
          </Grid>

        </Grid>
        
        {!historyData ? (< CircularProgress />) : (
          <Line
            options={chartOptions}
            data={chartData}
          />
        )}

    </Box>
  )
}

export default HistoryChart