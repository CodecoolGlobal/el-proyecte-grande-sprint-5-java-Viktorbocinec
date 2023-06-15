import { useState } from "react";
import Modal from 'react-modal';
import '../../General.css'
import Gandalf from '../../assets/gandalf-sax-guy.gif'


export default function AboutPopUp(){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };



    return (
        <div>
            <p onClick={openModal}>About</p>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal-content'> 
                <h2 style={{ fontSize: '50px' }}>THANK YOU VERY MUCH FOR YOUR ATTENTION</h2>
                <img src={Gandalf} alt="Logo"  style={{ width: '1700px' }} />
            </Modal>
        </div>
    );

}