import NavigationBar from "../molecules/NavigationBar";
import { useState } from "react";

export default function Register(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        // Perform registration logic here
        // You can access the form data using the firstName, lastName, email, and password state variables
      };


      return (
        <>
              <NavigationBar showRegisterButton={false} showLoginButton={false} showLogoutButton={false} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <form onSubmit={handleRegister}>
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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