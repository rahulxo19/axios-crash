const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const message = require('./message');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({extended: false}))

app.use('/login', (req,res,next) => {
  res.send(`<form action="/" onSubmit="localStorage.setItem('username')">
  <input type="text" id="username" name="username"><button type="submit">login</button></form>`)
})

app.get('/', (req, res, next) => {
  fs.readFile('message.txt', (err,data) => {
  if(err){
    console.log(err);
  }

  res.send(`${data}<form action='/' method="POST" onSubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
  <input type="text" id="message" name="message" placeholder="Enter Message here">
  <input type="hidden" id="username" name="username"><br /> <button type="submit">Send</button></form>`)
})
  })

app.post('/', (req, res, next) => {
  fs.writeFile('message.txt', `${req.body.username}: ${req.body.message}`, err => err ? console.log(err) : res.redirect("/"));
})

app.listen(3000);