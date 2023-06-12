import { Link } from "react-router-dom";
import NavigationBar from "../molecules/NavigationBar";

export default function HomePage(){

    return(
        <>
        <NavigationBar showLoginButton={true} showRegisterButton={true}/>
        <Link to="/questions"><button>Go To Questions</button></Link> 
        </>
    )

}