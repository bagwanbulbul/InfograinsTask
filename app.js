// const express = require('express');
// const mongoose = require('mongoose');
// const PORT = 4000;
// var bodyParser = require('body-parser')
// const app = express();

// // const User = require("./models/users")
// app.use(bodyParser())
// // mongoose.set('useFindAndModify', false);
// mongoose.connect('mongodb://localhost:27017/Infograins', {
//         useUnifiedTopology: false,
//         useNewUrlParser: true
//     })
//     .then(() => {
//         console.log('Connected to the Database successfully');
//     });

// app.listen(PORT, () => {
//     console.log('Server is listening on Port:', PORT)
// })

const jwt = require('jsonwebtoken');
const users = require("./routes/index");
const admin = require("./routes/admin");
const express = require('express');
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const  mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/infograin?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to the Database successfully');
  }).catch((err)=>{
    console.log(err);
  })

app.use('/', users);
app.use('/admin',admin);

app.listen(5000, ()=>{
    console.log("server is listning on port 5000");
});