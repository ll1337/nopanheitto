import './RandomCourse.css';
import React, { useState, useEffect } from 'react';


function RandomCourse({ onClick }) {
  const [course, setCourse] = useState("Heitä noppaa!")
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleButtonClick = () => {
    // Call the onClick prop to trigger the spinning effect
    onClick();
    setButtonVisible(false);
    // You can update the course state or perform other actions as needed
    setCourse("Ongelmanuoret II");
    setTimeout(() => {
        setButtonVisible(true);
      }, 2140);
  };
    return(
        <div className='result'>
            {buttonVisible && (
                <button onClick={handleButtonClick}>{course}</button>
            )}
        </div>
      
    );
}

export default RandomCourse