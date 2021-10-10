const router = require('express').Router();
const fs = require('fs');
const path = require('path');
let db = require('../db/db.json');

// REQUIRE MODULE TO GENERATE UNIQUE IDS
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    res.json(db);
});

router.post('/', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    db.push(newNote);

    console.info(`${req.method} request recieved`);
    
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), {flag: 'w+'}, () => {
        res.json(newNote);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params; 
    let newDb = [];

    for(let i = 0; i < db.length; i++) {
        if (db[i].id !== id) {
            newDb.push(db[i]);
        }
    }

    db = newDb;
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(newDb), () => {
        res.json(newDb);
    });
});

module.exports = router;