const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(`<form action='/' onSubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
    <input type="text" id="message" name="message" placeholder="Enter Message here">
    <input type="hidden" id="username" name="username"><br /> <button type="submit">Send</button></form>`)
})

const data = []
router.post('/', (req, res, next) => {
    console.log(req.body.username);
    console.log(req.body.message);
})

module.exports = router;