const express=require('express');
const routes=express.Router();
const path=require('path');
const bodyparser=require('body-parser');


const db=require('../util/database');



routes.use(bodyparser.urlencoded({ extended : false}));

routes.get('/',(req,res,next) =>{
        db.execute('SELECT * FROM user ' ,(err,data,fielddata) =>{
                if(err) throw err;
                res.render('register',{list:data})
               });       
});
routes.get('/remove/(:id)', function (req, res, next) {
        var user = { id: req.params.id }
        db.query(
          'DELETE FROM user WHERE id = ' + req.params.id,
          user,
          function (err, result) {
           if(err) console.log(err);
           res.redirect('/');
          },
        )
      })

      routes.get('/update/(:id)', function (req, res, next) {
        var user = { id: req.params.id }
       try {
        db.query(
          'SELECT * FROM user WHERE id = ' + req.params.id,
          user,
          function (err, result) {
           if(err) console.log(err);
                res.render('update', {update:result});
        },
        )
       }catch(err){
        console.log(err);
       }
      })

      
      routes.post('/update/(:id)', function (req, res, next) {
        var name=req.body.name;
        var email=req.body.email;
        var number=req.body.number;
        var id=req.body.id;

        var sql=db.query('UPDATE user set email=?, name=?, number=? WHERE id=?');

      
        db.query(sql,[email,name,number,id], function(err,result) {
          if(err) console.log(err);
          res.redirect('/');
  });
      
      });
// routes.get('/delete',(req,res) =>{
//         var sql=db.execute('DELETE FROM user WHERE id=?');

//         var id=req.params.id;

//         db.query(sql,id,(err,result) =>{
//                 if(err) console.log(err);
//                 res.redirect('/');
//         })

// });


routes.post('/add',(req,res,next) =>{
        const name=req.body.name;
        const email=req.body.email;
        const number=req.body.number; 
       db.execute('INSERT INTO user(name,email,number) VALUES(?,?,?)',[name,email,number]);

       res.redirect('/');
})


module.exports=routes;