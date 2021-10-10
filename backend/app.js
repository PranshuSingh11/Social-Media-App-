const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require('body-parser')
const cors = require('cors')
require('express-async-errors')

//import routes
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')


//middleware
app.use(cors())
app.use(bodyParser.json())
app.use('/posts',postsRoute)
app.use('/uploads',express.static('uploads'))
app.use('/user',authRoute)

//routes
app.get("/", (req, res) => {
  res.send("Home");
});

//connect to DB
mongoose
.connect(process.env.DB_CONNECTION, { useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })

.then(x => {
  console.log(
    `Connected to Mongo! Database name: "${x.connections[0].name}"`
  );
})
.catch(err => {
  console.error("Error connecting to mongo", err);
});




//Listen to server
app.listen(3001);
