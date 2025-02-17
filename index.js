// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.

const student = require('./data.json');



const express = require('express');
const { resolve } = require('path');

const app = express();



app.use(express.json());
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});



app.post('/students/above-threshold', (req,res) => {
  const threshold = req.body.threshold;
  const studentsAboveThreshold = student.filter(student => student.total > threshold);
  
  if (studentsAboveThreshold.length === 0) {
    return res.json({
      count: 0,
      students: []
    });
  }
  
  // Sort students by total in descending order
  studentsAboveThreshold.sort((a, b) => b.total - a.total);
  
  // Return the result as a JSON response
  res.json({
    count: studentsAboveThreshold.length,
    students: studentsAboveThreshold
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


