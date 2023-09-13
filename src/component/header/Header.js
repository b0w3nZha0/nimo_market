import Navbar from './Navbar';
import GlobalData from './GlobalData';

// Header includes global market data and navbar
const Header = () => {
    return(
        <div className='Header'>
            <GlobalData />
            <Navbar />
        </div>
    )
}

export default Header;