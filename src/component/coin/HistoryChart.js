import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HisotryData } from '../../config/api';
import axios from 'axios';
import { CircularProgress, Container } from '@mui/material';
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
  const {id} = useParams();
  const [historyData, setHistoryData] = useState();
  const [days, setDays] = useState(1);

  const fetchHistoryData = async () => {
    try {
      const res = await axios.get(HisotryData(id, days));
      const data = res.data.prices;
      console.log(data);
      const coinChartData = data.map(
        val => ({x: val[0], y: val[1].toFixed(2)}));
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
    labels: days === 1 ? historyData?.map(val => moment(val.x).format('LT')) : historyData?.map(val => moment(val.x).format('MMMDD')),
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


  return (
    <Container sx={{ marginTop: 5}}>
      {!historyData ? (< CircularProgress />) : (
        <Line 
          options={chartOptions}
          data = {chartData}
        />
      )}
      
  
    </Container>
  )
}

export default HistoryChart