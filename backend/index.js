const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000; // You can change the port if needed

// Middleware to parse JSON requests
app.use(express.json());

// Route for getRandomCourse
app.get('/getRandomCourse', (req, res) => {
    // Read courses.json file
    fs.readFile('./courses/output.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
        return;
    }

    // Parse JSON data
    const courses = JSON.parse(data);
    console.log(courses.length);

    // Select a random course
    const randomIndex = Math.floor(Math.random() * courses.length);
    const randomCourse = courses[randomIndex];
    console.log(randomCourse);

    // Send the selected course as a response
    res.json(randomCourse);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});