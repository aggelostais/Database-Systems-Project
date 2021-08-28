const express = require('express');
const indexRouter = require('./routes/index');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/', indexRouter);

app.listen(4000, () => {
    console.log("Backend server listening at port 4000");
});