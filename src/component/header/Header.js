import Navbar from './Navbar';
import GlobalData from './GlobalData';

const Header = () => {
    return(
        <div className='Header'>
            <GlobalData />
            <Navbar />
        </div>
    )
}

export default Header;