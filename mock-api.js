const express = require('express');
const apiMocker = require('connect-api-mocker');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(cors());
app.use('/api', apiMocker('mock'));

app.listen(port, () => console.log(`Mock api server listening on port ${port}!`));
