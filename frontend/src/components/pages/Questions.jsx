import QuestionUpload from "../molecules/QuestionUpload";
import QuestionsDisplay from "../molecules/QuestionsDisplay";
import NavigationBar from "../molecules/NavigationBar";
import Footer from "../molecules/Footer";

export default function Questions(){
    return(
        <>
        <NavigationBar showLogoutButton={true}/>
        <QuestionsDisplay />
        <QuestionUpload />
        <Footer />
        </>
    )
}