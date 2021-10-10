//REQUIRE EXPRESS ROUTER AND PATH
const router = require('express').Router();
const path = require('path');

//ON START BUTTON CLICK, REQUEST TO REDIRECT TO NOTES HTML PATH
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
    console.info(`${req.method} request recieved`);
});

//ROUTE BACK TO ROOT/INDEX.HTML
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router;