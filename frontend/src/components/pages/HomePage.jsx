import { Link } from "react-router-dom";
import NavigationBar from "../molecules/NavigationBar";
import Chinese from "../../assets/chinese.gif";
import Footer from "../molecules/Footer";

export default function HomePage(){

    const username = localStorage.getItem("username");

    return(
        <>
        <NavigationBar showLoginButton={true} showRegisterButton={true}/>
        <div className="logo-container">
        <img src={Chinese} alt="Logo"  style={{ width: '500px' }} />
        <img src={Chinese} alt="Logo"  style={{ width: '500px' }} />
        <img src={Chinese} alt="Logo"  style={{ width: '500px' }} />
      </div>
      {username && <Link to="/questions"><button>Go To Questions</button></Link> }
      <Footer />
        </>
    )

}