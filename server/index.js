const express = require('express');
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const path = require('path');
const router = require('./api');
const cluster = require('cluster');
const config = require('./config')({defaultConfig: { port: 3002 }});
const axios = require('axios');

if (cluster.isMaster) {
    
    var cpuCount = require('os').cpus().length * 2;
	
	for ( let i = 0; i < cpuCount; i++) {
		cluster.fork();
    }
    
} else {

    let app = express();

    app.use(BodyParser.json());
    app.use(CookieParser());

    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin", "*.thomaspyle.com");
        res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });
/*
    app.use(async (req,res,next)=>{
	let cookieId = req.cookies.SID;
	if ( cookieId === undefined ) {
	    res.redirect(`https://auth.thomaspyle.com/login?redirect=${encodeURIComponent(`${req.protocol}://${req.get("host")}${req.url}`)}`);
	} else {
	    let response = await axios.get(`https://auth.thomaspyle.com/api/v1/check/todo/${cookieId}`, { withCredentials: true });
            if (response.data.status) {
		req.session = response.data;
		next()
	    } else {
		res.redirect(`https://auth.thomaspyle.com/login?redirect=${encodeURIComponent(`${req.protocol}://${req.get("host")}${req.url}`)}`);
	    }
	}
    });
*/  
    app.use('/api', router);

    app.use(express.static(path.join(__dirname, 'build')));
 
    app.get('/*', (req,res)=>{
        res.sendFile(path.join(__dirname,'build','index.html'));
    })

    app.listen(config.port,()=>{
        console.log(`Now listening on port ${config.port}`);
    });
}
