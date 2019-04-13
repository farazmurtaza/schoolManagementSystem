const express = require('express');
const router = express.Router();
const database = require('../database');
const findUser = require('./usermodel');
const bodyParser = require('body-parser');

router.use(bodyParser.json());


// router.get('/', (req, res) =>{
//   res.send(
//
//   )
// });

router.post('/submit', (req, res) =>{
//  console.log(req.body);
  if(req.body.option=="admin"){
    console.log(req.body)
    var reg_no = req.body.regno;
    console.log(reg_no);
    let queryString = "SELECT TPassword, ARegno FROM Administration where ARegno = ?"
    database.connection.query(queryString,[req.body.regno],function(err1,result){
      if(err1){
        console.log('post error');
      }
      console.log(req.body.password);
      console.log(req.body.regno);

      if(result[0].TPassword == req.body.password){
        //let queryString = "SELECT ARegno FROM Administration where TUsername = ?"
      //  database.connection.query(queryString, [req.body.username], function(err2,userid){
        //  if(err2) throw err2;
          findUser.usermodel(result[0].ARegno,function(user){
            req.session.user = result[0].ARegno;
            console.log(req.session.user);
            res.redirect("/admin/home");
          });
      //  });
      }
      else{
        res.send('User not found');
      }
    });
  }
  else if(req.body.option=="teacher"){
    console.log(req.body.option);
    res.redirect(307, '/teacher/login');
  }
  else if(req.body.option=="student"){
    res.redirect(307, '/student/profile');
  }
});


module.exports = router;
