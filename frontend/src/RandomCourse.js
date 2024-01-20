import "./RandomCourse.css";
import React, { useState } from "react";

function RandomCourse({ onClick }) {
  const [course, setCourse] = useState("Heitä noppaa!");
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleButtonClick = () => {
    onClick();
    setButtonVisible(false);
    setCourse("Vektorit ja matriisit? :) <3 ");
    setTimeout(() => {
      setButtonVisible(true);
    }, 2140);
  };
  return (
    <div onClick={handleButtonClick} className="result">
      {buttonVisible && <div className="course">{course}</div>}
    </div>
  );
}

export default RandomCourse;
