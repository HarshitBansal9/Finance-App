//imports entire express library as a function
const express = require('express');
//instance of an express application
const app = express();
const PORT = 3002;
//have to go local host:3001 to make requests to application
app.listen(PORT,()=>{console.log(`Running express server from ${PORT}`)});