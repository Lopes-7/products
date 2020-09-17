/**
 * IMPORTS
 */
const routes = require('express').Router();
const mongoose = require('mongoose');
const Product = require('./model/product');

/**
 * CODE
 */
// connect to local database
mongoose
    .connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Could not connect to database'));

// get list of products
routes.get('/products', (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    Product.find()
        .then((data) => {
            console.log('response: 200 Found documents: ', data.length);
            return res.status(200).send(data);
        })
        .catch((error) => {
            console.log('Could not find document', error);
            return res
                .status(404)
                .send({message: 'Could not get db documents'});
        });
});

// post new product
routes.post('/products', (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    // bad payload: throw error response
    if (
        !req.body ||
        !req.body.price ||
        !req.body.qty ||
        !req.body.name ||
        isNaN(Number(req.body.price)) === true ||
        isNaN(Number(req.body.qty)) === true
    ) {
        console.log('result: bad payload');
        return res.status(400).send({message: 'bad payload'});
    }

    // instatiate new Product
    const product = new Product({
        name: req.body.name,
        price: Number(req.body.price),
        qty: Number(req.body.qty),
    });

    // save product to db
    product.save();

    // return response created
    console.log('response: 200');
    return res.status(201).send(product);
});

// edit product
routes.put('/products/:id', async (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    // bad payload: throw error response
    if (
        !req.body ||
        !req.body.price ||
        !req.body.qty ||
        !req.body.name ||
        isNaN(Number(req.body.price)) === true ||
        isNaN(Number(req.body.qty)) === true
    ) {
        console.log('result: bad payload');
        return res.status(400).send({message: 'bad payload'});
    }
    // get parameter id
    const id = req.params.id;

    // update document
    await Product.findByIdAndUpdate(
        {_id: id},
        {
            name: req.body.name,
            price: Number(req.body.price),
            qty: Number(req.body.qty),
        }
    )
        .then((result) => {
            console.log('result: ', result);
            return res.status(200).send(result);
        })
        .catch((error) => {
            console.log(error);
            console.log('Could not find document');
            return res.status(404).send({message: 'could not get documents'});
        });
    console.log('response: 200');
    return res.status(200).send(req.body);
});

// delete a product
routes.delete('/products/:id', (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    // get paremeter id
    const id = req.params.id;

    // get document with provided id
    Product.deleteOne({_id: id})
        .then((result) => {
            console.log('result: ', result);
            return res.status(200).send(result);
        })
        .catch(() => {
            console.log('Could not find document');
            return res
                .status(404)
                .send({message: 'could not get db documents'});
        });
});

/**
 * EXPORTS
 */
module.exports = routes;
