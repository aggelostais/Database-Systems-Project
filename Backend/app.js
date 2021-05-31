const express = require('express');
const serviceRouter = require('./routes/serviceRouter');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/services', serviceRouter);

app.listen(4000, () => {
    console.log("Backend server listening at port 4000");
});