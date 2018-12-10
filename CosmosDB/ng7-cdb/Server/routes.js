const express = require('express');
const router = express.Router();
const HeroDao = require("./models/heroDao");

var CosmosClient = require('@azure/cosmos').CosmosClient;
var config = require('./config');
const cosmosClient = new CosmosClient({ endpoint: config.host, auth: {masterKey: config.authKey}});
const heroDao = new HeroDao(cosmosClient, config.databaseId, config.containerId);

heroDao
.init(err => {
    console.error(err);
})
.catch(err => {
    console.error(err);
    console.error("Shutting down because there was an error settinig up the database.");
    process.exit(1);
});

router.get('/heroes', (req,res)=>{
    heroDao.getItems().then((data)=>{
        res.send(200, data);
    }).catch(err=>{
        console.log(err);
    });
});

router.post('/hero', (req,res) =>{
    const item = req.body;
    heroDao.addItem(item).then((data)=>{
        res.send(200,data);
    }).catch(err=>{
        const errBody = JSON.parse(err.body);
        let errMsg = errBody.message;
        if(errMsg.indexOf("Errors",0)>-1)
        {
            errMsg = errBody.message.split('\r\n')[0].replace('Message:','');
            errMsg = JSON.parse(errMsg);
            errMsg = errMsg.Errors[0];
        }
        res.send(err.code,{error:errMsg});
    });
});

router.put('/hero/:id', (req,res) =>{
    const itemId = String(req.params.id);
    const item = req.body;
    heroDao.updateItem(itemId,item).then((data)=>{
        res.send(200,data);
    }).catch(err=>{
        console.log(err);
    });
});

router.delete('/hero/:id', (req,res) =>{
    const itemId = String(req.params.id);
    heroDao.deleteItem(itemId).then(()=>{
        res.send(200,{message:'Deleted'});
    }).catch(err=>{
        console.log(err);
    });
});

module.exports = router;