const express = require('express');
const router = express.Router();
const data = require('./data');

router.get('/ping',async (req,res)=> {
    res.send('pong');
});

router.get('/item',async (req,res)=>{
    if (req.session.username) {
        try {
            let results = await data.getByUser(req.session.username);
            res.send(results);
        } catch (e) {
            res.status(500).send(e);
        }
    } else {
        res.sendStatus(403);
    }
});

router.get('/item/:id',async (req,res)=>{
    let { id } = req.params;
    let { username } = req.session;
    try {
        let results = await data.getById(id);
        if ( results == null ) {
            res.sendStatus(404);
        } else {
            if (results.username == username) {
                res.send(results);
            } else {
                res.sendStatus(403);
            }
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/item',async (req,res)=>{
    let { username } = req.session;
    let { description, title } = req.body;
    try {
        await data.createItem(username, title, description);
        let result = await data.getByUser(username);
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(400);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/item/:id',async (req,res)=>{
    let { username } = req.session;
    let { id } = req.params;
    let { description, title, status } = req.body;
    try {
        let item = await data.getById(id);
        if ( item.username != username ) {
            res.sendStatus(403);
        } else {
            let result = await data.updateItem(id, { title, description, status });
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(400);
            }
        }
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

router.delete('/item/:id',async (req,res)=>{
    let { username } = req.session;
    let { id } = req.params;
    try {
        let item = await data.getById(id);
        if ( item.username != username ) {
            res.sendStatus(403);
        } else {
            let result = await data.deleteItem(id);
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
