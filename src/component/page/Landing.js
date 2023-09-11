import { Container } from '@mui/material';
import LandingTitle from '../landing/LandingTitle';
import CoinsTable from '../landing/CoinsTable';

const Landing = () => {


    return(
        <div className='Landing'>
            <Container maxWidth={''}>
                <LandingTitle />
                <CoinsTable />    
            </Container>
        </div>
        
    )

}

export default Landing;