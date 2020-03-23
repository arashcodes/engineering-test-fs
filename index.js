const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3000;

app.use(cors());

app.use('/', express.static(path.join(__dirname, './client/dist')));

app.listen(port, () => console.log(`Listening on port ${port}`));
