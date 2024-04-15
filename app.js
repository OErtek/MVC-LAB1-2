const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'student.html'));
});

app.post('/student', (req, res) => {
    const { name, lastname, age, gender, code, studyField } = req.body;
    const data = `Name: ${name}\nLastname: ${lastname}\nAge: ${age}\nGender: ${gender}\nCode: ${code}\nStudyField: ${studyField}`;
    fs.writeFileSync(`${code}.txt`, data);
    res.send(data.replace(/\n/g, '<br>'));
});

app.use((req, res) => {
    res.status(404).send('404 Not Found'); 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});