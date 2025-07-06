require('dotenv').config()
const express = require('express');
const app = express();
const connectdb = require('./database/db')
const Routers = require('./Routers/adminRouter');
const cors = require('cors');
app.use(cors())
app.use(express.json());
connectdb();
app.use('/',Routers);
app.listen(process.env.PORT || 3000,()=>{
    console.log(`server is connected!`)
})