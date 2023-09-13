import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const webTitle = "Nimo Market";

    return (
        <AppBar color='transparent' position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button 
                        href="/" 
                        style={{ 
                                backgroundColor: 'transparent', 
                                padding: '0',
                                textTransform: 'none' }} 
                        
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}
                        >
                            <img src={logo} alt={logo} height='45' />
                            <Typography variant='h4' fontWeight={'bold'} color={'black'}>
                                {webTitle}
                            </Typography>
                        </Stack>
                    </Button>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
