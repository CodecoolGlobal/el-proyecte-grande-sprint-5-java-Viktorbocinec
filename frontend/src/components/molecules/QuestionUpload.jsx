import { useState } from "react";
import '../../General.css'

export default function QuestionUpload() {
    const [selectedFile, setSelectedFile] = useState();
    const [questionText, setQuestionText] = useState("");
    const [answerText, setAnswerText] = useState("");
    const [category, setCategory] = useState("notDone")
  
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
  
    const handleQuestionTextChange = (e) => {
      setQuestionText(e.target.value);
    };
  
  
    const handleAnswerTextChange = (e) => {
      setAnswerText(e.target.value);
    };

  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('questionText', questionText.valueOf());
      formData.append('answerText', answerText.valueOf());
      formData.append('image', selectedFile);
      formData.append('category', category.valueOf());

      for (const value of formData.values()) {
        console.log(value)
      }

      fetch('http://localhost:8080/questions/upload', {
        method: 'POST',
        headers: {
          'Authorization': "Bearer " + localStorage.getItem("token")
        },
        // body: JSON.stringify(formData)
        body: formData

        
      })
        .then(response => response.json())
        .then(success => {
          // Do something with the successful response
          alert("Question Upload Succesfully");
          setQuestionText("");
          setAnswerText("");
          setSelectedFile(null);
        
          // Refresh the site
          window.location.reload();
        })
        .catch(error => console.log(error));
    };
  
    return (
      <div className="uploadbar">
        <div className="uploadbar-container">    <form onSubmit={handleSubmit}>
        <label>
          Question:
          <textarea type="text" value={questionText} onChange={handleQuestionTextChange} />
        </label>
        <label>
          Answer:
          <textarea type="text" value={answerText} onChange={handleAnswerTextChange} />
        </label>
        <label>
          Answer Image:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Upload</button>
      </form>
      </div>
      </div>
    );
  };
