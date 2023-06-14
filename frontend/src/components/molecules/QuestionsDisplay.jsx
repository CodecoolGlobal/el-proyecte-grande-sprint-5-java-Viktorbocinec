import { useEffect, useState } from "react";
import '../../General.css'
import ShowAnswerPopUp from "./ShowAnswerPopUp";

export default function QuestionsDisplay(){
    const [questions, setQuestions] = useState([]);
    const loggedInUser = localStorage.getItem("username");


    // useEffect(() => {
    //     fetch('http://localhost:8080/questions',{
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': "Bearer " + localStorage.getItem("token")
    //     }
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       const username = localStorage.getItem("username");
    //       const userQuestions = data.filter(question => question.username === username);
    //       setQuestions(userQuestions);
    //     })
    //     .catch(error => console.log(error));
    // }, []);
    
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
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      const username = localStorage.getItem("username");
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

    return(
      <>
            <button onClick={() => fetchQuestions(loggedInUser)}>All</button>
      <button onClick={() => fetchQuestions(loggedInUser, 'needsWork')}>Needs Work</button>
      <button onClick={() => fetchQuestions(loggedInUser, 'mastered')}>Mastered</button>
      <button onClick={() => fetchQuestions(loggedInUser, 'toDo')}>To Do</button>

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
              <ShowAnswerPopUp answerText={question.answerText} answerImage ={question.image} questionId={question.id} questionCategory={question.category}/></td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    );
};