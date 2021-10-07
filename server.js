// REQUIRE NODE MODULES
const express = require('express').Router();
const path = require('path');
const fs = require('fs');

// REQUIRE JSON DB
const db = require('./db/db.json');

const PORT = 3001;
const app = express();

// BOILERPLATE MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request received`);

    console.info(`${req.method} request recieved`);
});



// LISTEN TO PORT
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);