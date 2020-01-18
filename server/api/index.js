const express = require('express');
const router = express.Router();
const routerv1 = require('./v1');

router.use((req,res,next)=>{
    req.session = { username: 'user' };
    next();
})

router.use('/v1', routerv1);

module.exports = router;
