const express = require('express');
const data = require('./data');

const router = express.Router();

router.get('/item',async (req,res)=>{
    let { username } = req.session;
    try {
        let results = await data.getByUser(username);
        res.send(results);
    } catch (e) {
        if (e.status) {
            res.status(e.status).send(e.message);
        } else {
            res.status(500).send(e);
        }
    }
});

router.get('/item/:id',async (req,res)=>{
    let { id } = req.params;
    let { username } = req.session;
    try {
        let results = await data.getById(id, username);
        res.send(results);
    } catch (e) {
        if (e.status) {
            res.status(e.status).send(e.message);
        } else {
            res.status(500).send(e);
        }
    }
});

router.post('/item',async (req,res)=>{
    let { username } = req.session;
    let { description, title } = req.body;
    try {
        let result = await data.createItem(username, title, description);
        res.send(result);
    } catch (e) {
        if (e.status) {
            res.status(e.status).send(e.message);
        } else {
            res.status(500).send(e);
        }
    }
});

router.put('/item/:id',async (req,res)=>{
    let { username } = req.session;
    let { id } = req.params;
    try {
        let result = await data.updateItem(id, username, req.body);
        res.send(result);
    } catch (e) {
        if (e.status) {
            res.status(e.status).send(e.message);
        } else {
            res.status(500).send(e);
        }
    }
});

router.delete('/item/:id',async (req,res)=>{
    let { username } = req.session;
    let { id } = req.params;
    try {
        let result = await data.deleteItem(id, username);
        res.send(result);
    } catch (e) {
        if (e.status) {
            res.status(e.status).send(e.message);
        } else {
            res.status(500).send(e);
        }
    }
});

module.exports = router;
