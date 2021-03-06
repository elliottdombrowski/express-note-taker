// REQUIRE NODE MODULES
const express = require('express');

//DECLARE PORT TO LISTEN ON
const PORT = process.env.PORT || 3001;
const app = express();

// BOILERPLATE MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//IMPORT MODULARIZED ROUTES
app.use("/api/notes", require('./routes/apiRoutes'));
app.use('/', require('./routes/htmlRoutes'));

// LISTEN TO PORT
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);