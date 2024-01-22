//imports entire express library as a function
const express = require('express');
//instance of an express application
const app = express();
const PORT = 3002;
//have to go local host:3001 to make requests to application
const session = require('express-session');
const cors = require('cors');
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));
require('./database');
//middleware
app.use(express.json())
// registered the router
const authRoute = require('./routes/auth');
const expenseRoute = require('./routes/expense')
app.use(
  session({
    secret: 'APODAJDSDASMCZXMZADASDASDPASDOASDSAK',
    resave: false,
    saveUninitialized: false,
  })
);
app.use('/auth', authRoute);
app.use('/expense', expenseRoute)


app.listen(PORT, () => { console.log(`Running express server from ${PORT}`) });

