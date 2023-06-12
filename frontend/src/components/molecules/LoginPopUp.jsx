import { useState } from "react";
import Modal from 'react-modal';
import '../../General.css'
import { Buffer } from "buffer";

export default function LoginPopUp(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // const handleLogin = () => {

    //     closeModal();
    // };

    const handleLogin = async() => {
        const data = {
          username: username,
          password: password
        };
    
        await fetch('http://localhost:8080/auth/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
          },
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Login failed');
          }
        })
        .then(data => {
          console.log(data);//to delete
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          console.log(data.token);//to delete
          closeModal();
        })
        .catch(error => {
          console.error(error);
        });
      };

    return (
        <div>
            <button onClick={openModal}>Login</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal-content'> 
                <h2>Login</h2>
                <form>
                    <label>
                        User Name:
                        <input placeholder="Username" type="text" onChange={ (event) => setUsername(event.target.value) }/>
                    </label>
                    <label>
                        Password:
                        <input placeholder="Password" type="password" onChange={ (event) => setPassword(event.target.value) }/>
                    </label>
                </form>
                <button onClick={handleLogin} className="modal-button">Login</button>
            </Modal>
        </div>
    );

}