import { useContext } from "react";
import { Link } from "react-router-dom";
import '../../General.css'
import Logo from '../../assets/brain_expander_logo_transparent.png'
import LoginPopUp from "./LoginPopUp";
import LogoutButton from "./LogoutButton";






const NavigationBar = ({showRegisterButton, showLoginButton, showLogoutButton}) => {  
    const username = localStorage.getItem("username");
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
            {!username && <div>{showLoginButton && (<div className="button"><LoginPopUp /></div>)}
            {showRegisterButton && (<div className="button"><Link to="/register"><button className="button">Register</button></Link></div>)}</div>}


            {showLogoutButton && username && (<div className="button"><LogoutButton /></div>)}
          </div>
        </div>
      </div>
    );
  };
  
  export default NavigationBar;