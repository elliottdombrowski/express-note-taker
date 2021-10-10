//REQUIRE EXPRESS ROUTER TO ALLOW FOR ROUTES MODULARIZATION
const router = require('express').Router();

//REQUIRE NODE MODULRES
const fs = require('fs');
const path = require('path');

//IMPORT JSON "DATABASE" AS A VARIABLE
let db = require('../db/db.json');

// REQUIRE UUID MODULE TO GENERATE UNIQUE IDS
const { v4: uuidv4 } = require('uuid');

//GET JSON "DATABASE" AS A RESPONSE 
router.get('/', (req, res) => {
    res.json(db);
});

router.post('/', (req, res) => {
    //DECLARE VARIABLE FOR NEW NOTE OBJECT, W/ PARAMETERS MATCHING THE FRONT END
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    //PUSH NEW NOTE TO "DATABASE" ARRAY
    db.push(newNote);

    console.info(`${req.method} request recieved`);
    
    //WRITE NEW NOTE TO DB.JSON ARRAY.
    //FLAG TO WRITE TO FILE, NOT OVERRIDE
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), {flag: 'w+'}, () => {
        res.json(newNote);
    });
});

//ROUTE TO HANDLE DELETE REQUESTS
router.delete('/:id', (req, res) => {
    const { id } = req.params; 
    
    //DECLARE EMPTY ARRAY FOR NEW DATABASE
    let newDb = [];

    //LOOP THROUGH CURRENT DATABASE LENGTH
    for(let i = 0; i < db.length; i++) {
        //IF DATABASE ID DOES NOT MATCH ID TO BE DELETED, 
        if (db[i].id !== id) {
            //PUSH DATABASE ID/OBJECT TO "newDb" ARRAY
            newDb.push(db[i]);
        }
    }

    //REDECLARE "db" AS "newDb"
    db = newDb;
    
    //WRITE NEW ARRAY TO DB.JSON
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(newDb), () => {
        res.json(newDb);
    });
});

module.exports = router;