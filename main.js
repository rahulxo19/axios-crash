const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({extended: false}))

app.use('/login', (req,res,next) => {
  res.sendFile(path.join(__dirname + '/views/login.html'))
})

app.get('/', (req, res, next) => {
  fs.readFile('message.txt', (err, data) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      fs.readFile(path.join(__dirname, '/views/chat.html'), 'utf8', (err, html) => {
        if (err) {
          console.log(err);
          next(err);
        } else {
          const modifiedHtml = html.replace('{message}', data);
          res.send(modifiedHtml);
        }
      });
    }
  });
});
app.post('/', (req, res, next) => {
  fs.writeFile('message.txt', `${req.body.username}: ${req.body.message}`, err => err ? console.log(err) : res.redirect("/"));
})

app.use((req,res,next) => {
  res.sendFile(path.join(__dirname + '/views/404.html'));
})

app.listen(3000);
