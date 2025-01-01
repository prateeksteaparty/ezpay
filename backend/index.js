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
  

  //Pratik : "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzZlODdlNjE3NzAxMjFhM2FiNzI5NTAiLCJpYXQiOjE3MzUyOTY5OTh9.QzlC_34vAUxO7LGMhH8vc8WB-u9hMCoV-49Xwv-Ft9A"
  // Om :  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzZlODhhYjhkMTRlZDQ2MGQzMzU4NTMiLCJpYXQiOjE3MzUyOTcxOTV9.vgzAx0u-FV3i9UR7nlEK9qoos-c0qVcHpBm8Fe7Y-UU"