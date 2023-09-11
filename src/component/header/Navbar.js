import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import SearchIcon from '@mui/icons-material/Search';

const pages = ['Cryptocurrencies', 'Exchanges', 'Products', 'Learn'];

const Navbar = () => {
    const webTitle = "Nimo Market";

    return (
        <AppBar color='transparent' position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CurrencyBitcoinIcon
                        //sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        fontSize='large' />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            //display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {webTitle}
                    </Typography>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
