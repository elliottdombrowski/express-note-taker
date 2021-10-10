// REQUIRE NODE MODULES
const express = require('express');
const path = require('path');
const fs = require('fs');

// REQUIRE MODULE TO GENERATE UNIQUE IDS
const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

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


// ???? WHEN UUID AT BOTTOM, HTML WON'T UPDATE BUT TEXT IS DEFINED. UUID AT TOP, HTML UPDATES BUT TEXT UNDEFINED
// ONLY WRITING ID TO DB.JSON
app.post('/api/notes', (req, res) => {
    let newNote = {
        note_id: uuid(),
        title: req.query.noteTitle,
        text: req.query.noteText
    }
    db.push(newNote);

    console.info(`${req.method} request recieved`);
    
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(db), {flag: 'w+'}, () => {
        res.json(newNote);
    });

    fs.writeFile(path.join('/assets/notes.html'), JSON.stringify(db), {flag: 'w+'}, () => {
        res.json(newNote);
    });
});


// LISTEN TO PORT
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);