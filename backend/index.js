const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const mainRouter = require('.routes/index')
app.use(cors());
const app = express();

app.use('/api/v1', mainRouter)