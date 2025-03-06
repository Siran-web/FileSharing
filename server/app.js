const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./routes/route.js'); // Import your routes
const DBconnection = require('./database/db.js'); // Database connection

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({origin : '*'}));

app.use('/', router); // Use a single `/`

DBconnection();

const PORT = process.env.PORT|| 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});
