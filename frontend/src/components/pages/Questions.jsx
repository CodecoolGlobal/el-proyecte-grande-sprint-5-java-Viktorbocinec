import QuestionUpload from "../molecules/QuestionUpload";
import QuestionsDisplay from "../molecules/QuestionsDisplay";
import NavigationBar from "../molecules/NavigationBar";
import TabBar from "../molecules/TabBar";

export default function Questions(){
    return(
        <>
        <NavigationBar showLogoutButton={true}/>
        <TabBar />
        <QuestionUpload />
        <QuestionsDisplay />
        </>
    )
}