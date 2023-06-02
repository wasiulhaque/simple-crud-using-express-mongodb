const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productModel = require('./models/productModel');


app.use(express.json());
app.use(express.urlencoded({extended: false})); 

app.get('/products', async(req,res) => {
    try{
        const products = await productModel.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await productModel.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//update any product
app.put('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await productModel.findByIdAndUpdate(id, req.body);
        if(!product) return res.status(404).json({message: `Cannot find any product with ID ${ID}`});
        const updatedProduct = await productModel.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//create product
app.post('/product', async(req, res) => {
    try {
        const product = await productModel.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
})


//delete product
app.delete('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await productModel.findByIdAndDelete(id);
        if(!product) return res.status(404).json({message: `Cannot find any product with ID ${ID}`});
        res.status(200).json({message: "Product deleted successfully."});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://admin:admin1234@crud.zkzdll8.mongodb.net/CRUD-Tutorial?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, () => {
        console.log(`Node API app is running on port 3000.`);
    })
    console.log(`Connected to MongoDB.`)
}).catch((error) => {
    console.log(error)
})