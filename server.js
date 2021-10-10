// REQUIRE NODE MODULES
const express = require('express');

const PORT = 3001;
const app = express();

// BOILERPLATE MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api/notes", require('./routes/apiRoutes'));
app.use('/', require('./routes/htmlRoutes'));

// LISTEN TO PORT
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);