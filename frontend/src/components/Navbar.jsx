import { Link } from "react-router-dom";
import Logo from '../assets/Logo.png';
import '../styles/NavBar.css';

const Navbar = ({ isAuthenticated }) => {

    return (
        <div className="NavBar hidden-print">
            <Link to={isAuthenticated ? '/dashboard' : '/'}>
                <div className="LogoContainer">
                    <div className="LogoImage">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="LogoTitle">
                        <span>Eulogio "Amang" Rodriguez</span>
                        <span>Institute of Science and Technology</span>
                    </div>
                </div>
            </Link>

          
        </div>
    );
};

export default Navbar;
