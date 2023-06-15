import { useState, useEffect } from "react";
import Modal from 'react-modal';
import '../../General.css'



export default function ShowAnswerPopUp({answerText, answerImage, questionId, questionCategory}){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleEdit = (newCategory) => {
        const url = `http://localhost:8080/questions/${questionId}`;
        const updatedQuestion = {
            category: newCategory
        };

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(updatedQuestion),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            closeModal();
            // Refresh the site
          window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const FetchImage = ({imageName, alt })  => {
        const [imageUrl, setImageUrl] = useState(null);
    
        useEffect(() => {
            fetch(`http://localhost:8080/images/${imageName}`, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => response.blob())
            .then(images => {
                // Then create a local URL for that image and print it 
                let imageSrc = URL.createObjectURL(images);
                setImageUrl(imageSrc);
            })
        }, [imageName]);
    
        return (
            <img src={imageUrl} alt={alt} style={{ width: '150px' }} />
        );
    }



    return(
        <div>
            <button onClick={openModal}>Show Answer</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal-content'> 
                <h2>Answer</h2>
                <p>to delete: {questionCategory}</p>
                <p>{answerText}</p>
                {/* {answerImage && <p><img src={`http://localhost:8080/images/profile-pic-placeholder.jpg`} alt={questionId} style={{ width: '150px' }} /></p>} */}
                {answerImage && 
    <p>
        <FetchImage imageName={answerImage} alt={questionId} />
    </p>
}
                <button onClick={() => handleEdit('mastered')} className="modal-button">Mastered</button>
                <button onClick={() => handleEdit('needsWork')} className="modal-button">Needs Work</button>
            </Modal>
        </div>
    );


}