import NavigationBar from "../molecules/NavigationBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
      e.preventDefault();
  
      const user = {
          username: userName,
          password: password
      };

      const userData = JSON.stringify(user);
  
      fetch('http://localhost:8080/auth/register', { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: userData
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
        navigate('/')
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
  };


      return (
        <>
              <NavigationBar showRegisterButton={false} showLoginButton={false} showLogoutButton={false} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <form onSubmit={handleRegister}>
 
              <div>
                <label>User Name</label>
                <input
                  type="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </>
      );
    }