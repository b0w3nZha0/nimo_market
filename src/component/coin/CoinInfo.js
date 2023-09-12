import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import Overview from './Overview';
import PriceStatistics from './PriceStatistics';

const CoinOverview = () => {

  const [tabVal, setTabVal] = useState('1');

  const handleTabChange = (e, newVal) => {
    setTabVal(newVal);
  }

  return (
    <Box>
      <TabContext value={tabVal}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleTabChange}>
            <Tab label='Overview' value='1' />
            <Tab label='Price Statistics' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Overview />
        </TabPanel>
        <TabPanel value='2'>
          <PriceStatistics />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default CoinOverview