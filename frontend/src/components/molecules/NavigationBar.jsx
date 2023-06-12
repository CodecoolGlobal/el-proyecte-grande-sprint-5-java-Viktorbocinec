import { useContext } from "react";
import { Link } from "react-router-dom";
import '../../General.css'
import Logo from '../../assets/brain_expander_logo_transparent.png'
import LoginPopUp from "./LoginPopUp";




const NavigationBar = ({showRegisterButton, showLoginButton, showLogoutButton}) => {  
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div>
            <Link to="/">
              <img src={Logo} alt="Logo" className="logo" />
            </Link>
          </div>
          <div>
            <h1 className="company-name">Brain Expander</h1>
          </div>
          <div className="button-container">
            {showLoginButton && (<div className="button"><LoginPopUp /></div>)}
            {showRegisterButton && (<div className="button"><Link to="/register"><button className="button">Register</button></Link></div>)}
            {showLogoutButton && (<div className="button"><button className="button">Logout</button></div>)}
          </div>
        </div>
      </div>
    );
  };
  
  export default NavigationBar;