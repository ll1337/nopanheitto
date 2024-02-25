import "./RandomCourse.css";
import React, { useState } from "react";

function RandomCourse({ onClick }) {
  const [course, setCourse] = useState(null);
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleButtonClick = async () => {
    onClick();
    setButtonVisible(false);

    try {
      const response = await fetch('http://localhost:3000/getRandomCourse');
      if (!response.ok) {
        throw new Error('Failed to fetch course');
      }
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error.message);
    }

    setTimeout(() => {
      setButtonVisible(true);
    }, 2180);
  };

  return (
    <div onClick={handleButtonClick} className="result">
      {buttonVisible && (
        <div className="course">
          {course ? (
            Object.keys(course).map(courseCode => (
              <div key={courseCode}>
                <p>{courseCode}</p>
                <p>
                  {" "}
                  <a href={`https://www.tuni.fi${course[courseCode].courseLink}`} target="_blank" rel="noopener noreferrer">
                    {course[courseCode].courseName}
                  </a>
                </p>
              </div>
            ))
          ) : (
            "Heitä noppaa!"
          )}
        </div>
      )}
    </div>
  );
}

export default RandomCourse;
