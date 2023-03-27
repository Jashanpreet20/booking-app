const express=require('express');
const path=require('path');

const app=express();
const adminroutes=require('./controller/admin');

app.use(adminroutes);

const db=require('./util/database');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.listen(3000 ,() =>{
    console.log('server run at 3000');
})