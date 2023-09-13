import { Container } from '@mui/material';
import LandingTitle from '../component/landing/LandingTitle';
import CoinsTable from '../component/landing/CoinsTable';

// Landing page includes title(TODO) and coins market table
const Landing = () => {
    return(
        <div className='Landing'>
            <Container>
                <LandingTitle />
                <CoinsTable />    
            </Container>
        </div>
    )
}

export default Landing;