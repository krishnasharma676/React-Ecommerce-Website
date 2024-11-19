const express = require('express')
require('./db/config')
const app = express()
const User = require('./db/user')
const multer = require('multer');
const cors = require('cors');
const Product = require('./db/Product');
const jwt = require('jsonwebtoken');
const jwtKey = 'E-commerce';

// Set up multer to store images in memory as Buffer
const storage = multer.memoryStorage(); // Store the file in memory as a Buffer
const upload = multer({ storage: storage });

app.use(cors());

app.use(express.json())


app.post("/signup", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result.toObject();
    delete result.password
    jwt.sign({result},jwtKey,{expiresIn:"2h"},(err, token)=>{
        if(err){
            res.send({result :'Something Went Wrong'})
        }
        res.send({result, auth : token})
    })
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {

            jwt.sign({user},jwtKey,{expiresIn:"2h"},(err, token)=>{
                if(err){
                    res.send({result :'Something Went Wrong'})
                }
                res.send({user, auth : token})
            })
        } else {
            res.send('No User found')
        }
    } else {
        res.send('No User found')
    }
})

app.post("/add-product", verifyToken, upload.single('productImage'), async (req, res) => {
    try {
        const { name, price, category, company, userId } = req.body;

        if (!req.file) {
            return res.status(400).send("No image uploaded.");
        }

        // Convert the image buffer to Base64 string
        const base64Image = req.file.buffer.toString('base64'); // Buffer to Base64

        // Save product data with Base64 image in DB
        const newProduct = new Product({
            name,
            price,
            category,
            company,
            userId,
            productImage: base64Image // Save Base64 image
        });

        const result = await newProduct.save();
        res.status(201).send(result); // Send the saved product as a response
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Failed to add product.");
    }
});

app.get("/products",verifyToken, async (req, res) => {
    let product = await Product.find()
    if (product < 0) {
        res.send("No Product Found")
    } else {
        res.send(product)
    }
})

app.delete("/product/:id",verifyToken, async (req, res) => {
    console.log(req.params);
    
    let product = await Product.deleteOne({_id : req.params.id})
    res.send(product)
})

app.get("/product/:id",verifyToken, async (req, res) => {    
    let product = await Product.findOne({_id : req.params.id})
    res.send(product)
})

app.put("/product/:id",verifyToken, async (req, res) => {    
    let product = await Product.updateOne({_id : req.params.id} , {$set: req.body})
    res.send(product)
})

app.get("/search/:key?",verifyToken, async (req, res) => {    
    const key = req.params.key;

    // Check if `key` is empty, null, or undefined
    let result;
    if (!key) {
        result = await Product.find(); // Retrieve all products
    } else {
        result = await Product.find({
            "$or": [
                { name: { $regex: key, $options: "i" } }, // Case-insensitive search
                { company: { $regex: key, $options: "i" } },
                { price: { $regex: key, $options: "i" } },
            ]
        });
    }

    res.send(result);
});

//middleware

function verifyToken (req ,res, next) {
let Token  = req.headers['authorization'];
console.log(Token);
if(Token){
    // Token = Token.split(' ')[1]
    
    jwt.verify(Token, jwtKey , (err, valid)=>{
        if(err){
            res.status(401).send({result : "enter valid token"})
        }else{
            next()
        }
    })
}else{
    res.status(403).send("Please Add Token With header")
}
}

app.listen(5000)