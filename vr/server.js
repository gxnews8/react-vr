var express = require('express'),
    app = express(),
    bp = require('body-parser'),
    path = require('path'),
    PORT = 8000;

app.use(express.static(path.join(__dirname,'./')))
app.use(express.static(path.join(__dirname,'/node_modules')))

app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`)
})
