'use strict';
const express = require('express');
const app = express();
const logger = require('morgan');
var path = require("path");

app.set('views', __dirname);
app.set('view engine', 'html');

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));

app.use('/', express.static('public'));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use((req, res, next) => {
  res.redirect('/')
});

const server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);  
});