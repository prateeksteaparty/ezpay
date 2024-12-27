const express = require('express');
const cors = require('cors');
const mainRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());  // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // To parse form-urlencoded data



app.use('/api/v1', mainRouter);

app.listen(3000, function() {
    console.log("Server running on http://localhost:3000");
  });
  