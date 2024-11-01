const express = require('express')
require('./db/config')
const app = express()
const User = require('./db/user')
const cors = require('cors');
app.use(cors());

app.use(express.json())


app.post("/signup", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result.toObject();
    delete result.password
    res.send(result)
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            res.send(user)
        } else {
            res.send('No User found')
        }
    } else {
        res.send('No User found')
    }
})

app.listen(5000)