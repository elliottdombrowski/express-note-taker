// REQUIRE NODE MODULES
const express = require('express');
const path = require('path');
const fs = require('fs');

// REQUIRE JSON DB
const db = require('./db/db.json');
const { send } = require('process');

const PORT = 3001;
const app = express();

// BOILERPLATE MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    console.info(`${req.method} request recieved`);
});

app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    let newNote = {
        title: req.query.noteTitle,
        text: req.query.noteText
    }
    db.push(newNote);

    // Save to file?
    console.info(`${req.method} request recieved`);
    
    fs.writeFile(path.join(__dirname, '/db/db.json'), {flag: 'w+'}, JSON.stringify(db), () => {
        res.json(newNote);
    });
});


// LISTEN TO PORT
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);