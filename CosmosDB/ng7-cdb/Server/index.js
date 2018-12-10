const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const routes = require('./routes')

const root = './';
const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(root,'dist')));
app.use('/api', routes);
app.get('*', (req,res)=>{
    res.sendFile('dist/index.html',{root});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

app.listen(port, ()=> console.log(`API running on localhost:${port}`));