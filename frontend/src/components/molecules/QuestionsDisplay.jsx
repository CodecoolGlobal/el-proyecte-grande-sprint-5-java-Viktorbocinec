import { useEffect, useState } from "react";
import '../../General.css'
import ShowAnswerPopUp from "./ShowAnswerPopUp";
import AcessDeniedPic from '../../assets/acess_denied.gif'


export default function QuestionsDisplay(){
    const [questions, setQuestions] = useState([]);
    const [allCount, setAllCount] = useState(0);
    const [needsWorkCount, setNeedsWorkCount] = useState(0);
    const [masteredCount, setMasteredCount] = useState(0);
    const [toDoCount, setToDoCount] = useState(0);


    const loggedInUser = localStorage.getItem("username");
    
    const fetchQuestions = async (username, category) => {
      try {
        const response = await fetch(
          `http://localhost:8080/questions?${username ? `username=${username}` : ''}${category ? `&category=${category}` : ''}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + localStorage.getItem("token")
            }
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setQuestions(data);

        switch(category) {
          case 'needsWork':
            setNeedsWorkCount(data.length);
            break;
          case 'mastered':
            setMasteredCount(data.length);
            break;
          case 'toDo':
            setToDoCount(data.length);
            break;
          default:
            setAllCount(data.length);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      const username = localStorage.getItem("username");
      fetchQuestions(username, "toDo");
      fetchQuestions(username, "needsWork");
      fetchQuestions(username, "mastered");
      fetchQuestions(username);
    }, []);

    const deleteQuestion = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if(confirmDelete){ 
          fetch(`http://localhost:8080/questions/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
          if(response.ok){
            setQuestions(questions.filter(question => question.id !== id)); // Update state
      
          }
        })
        .catch(error => console.error(error));}
    }



    if (!loggedInUser) {
      return <>
      <p className="red">You must be logged in to see and upload questions</p>
      <img src={AcessDeniedPic} alt="Logo" className="logo" style={{ width: '500px' }} />
      </>;
    }

    return(
      <>
            <div className="tabbar">
            <div className="tabbar-container">
                <div className="left-section">
                <button onClick={() => fetchQuestions(loggedInUser)}>All {allCount}</button>
            <button onClick={() => fetchQuestions(loggedInUser, 'needsWork')}>Needs Work {needsWorkCount}</button>
            <button onClick={() => fetchQuestions(loggedInUser, 'mastered')}>Mastered {masteredCount}</button>
            <button onClick={() => fetchQuestions(loggedInUser, 'toDo')}>To Do {toDoCount}</button>
                </div>
                <div className="middle-section">
                    <p className="username-show">{loggedInUser && "Hello "}{loggedInUser && loggedInUser}</p>
                </div>
                <div className="right-section">
                <p></p>
                </div>
            </div>
        </div>
        <table>
        <thead>
          <tr>
            <th>QuestionText</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.id}>
              <td>{question.questionText}</td>
              <td><button onClick={() => deleteQuestion(question.id)}>Delete</button>
              <ShowAnswerPopUp answerText={question.answerText} answerImage ={question.imagePath} questionId={question.id} questionCategory={question.category}/></td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    );
};

// import { useEffect, useState } from "react";
// import '../../General.css'
// import ShowAnswerPopUp from "./ShowAnswerPopUp";

// export default function QuestionsDisplay(){
//     const [questions, setQuestions] = useState([]);
//     const loggedInUser = localStorage.getItem("username");
//     const [currentPage, setCurrentPage] = useState(1);
//     const rowsPerPage = 5; // Set this to the desired number of rows per page

//     const fetchQuestions = async (username, category) => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/questions?${username ? `username=${username}` : ''}${category ? `&category=${category}` : ''}`, 
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': "Bearer " + localStorage.getItem("token")
//             }
//           }
//         );
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
  
//         const data = await response.json();
//         setQuestions(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     useEffect(() => {
//       const username = localStorage.getItem("username");
//       fetchQuestions(username, "toDo");
//     }, []);

//     const deleteQuestion = (id) => {
//       const confirmDelete = window.confirm("Are you sure you want to delete this question?");
//       if(confirmDelete){ 
//         fetch(`http://localhost:8080/questions/${id}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': "Bearer " + localStorage.getItem("token")
//           }
//       })
//       .then((response) => {
//         if(response.ok){
//           setQuestions(questions.filter(question => question.id !== id)); // Update state
//         }
//       })
//       .catch(error => console.error(error));}
//   }

//     const nextPage = () => {
//         setCurrentPage(prev => prev + 1);
//     };

//     const prevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(prev => prev - 1);
//         }
//     };
    
//     const indexOfLastQuestion = currentPage * rowsPerPage;
//     const indexOfFirstQuestion = indexOfLastQuestion - rowsPerPage;
//     const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

//     return(
//       <>
//         <button onClick={() => fetchQuestions(loggedInUser)}>All</button>
//         <button onClick={() => fetchQuestions(loggedInUser, 'needsWork')}>Needs Work</button>
//         <button onClick={() => fetchQuestions(loggedInUser, 'mastered')}>Mastered</button>
//         <button onClick={() => fetchQuestions(loggedInUser, 'toDo')}>To Do</button>

//         <table>
//         <thead>
//           <tr>
//             <th>QuestionText</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentQuestions.map(question => (
//             <tr key={question.id}>
//               <td>{question.questionText}</td>
//               <td>
//                 <button onClick={() => deleteQuestion(question.id)}>Delete</button>
//                 <ShowAnswerPopUp answerText={question.answerText} answerImage ={question.imagePath} questionId={question.id} questionCategory={question.category}/>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         </table>
//         <button onClick={prevPage}>Previous</button>
//         <button onClick={nextPage}>Next</button>
//       </>
//     );
// };