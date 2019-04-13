const path = require('path');
const express = require('express');
const router = express.Router();
const database = require('../database');

router.use(express.static(path.join(__dirname,'../','public')));

router.get('/home', (req, res)=>{
  // if(req.sessioncookie)
  if(req.session.user){
    var admin_info=[];
    queryString = "SELECT AFirstName, ALastName, TUsername, TPhoneno FROM Administration where ARegno = ?";
    //database.connection.query(queryString, 1235, function(err, result){
      database.connection.query(queryString, [req.session.user], function(err, result){
      if(err) throw err;
      console.log(result);
        admin_info= {
          firstName:result[0].AFirstName,
          lastName:result[0].ALastName,
          username:result[0].TUsername,
          phoneNo:result[0].TPhoneno,
          regno:req.session.user
        }
        console.log(admin_info);
        res.render(path.join(__dirname,'../','views/layouts/admin.hbs'),{adminInfo: admin_info});
    });
}
   else{
     console.log(req.session);
     res.send("You're not logged in");
   }
});
router.get('/logout',function(req,res){
  if(req.session.user){
    req.session.destroy();
    res.render(path.join(__dirname,'../','views/layouts/loggedout.hbs'),{});
  }
});

router.get('/info', function(req, res){
  var st_info={};
  if(req.session.user){
    let queryString = "SELECT SRegno, FirstName, LastName, SUsername, SPassword, Class, Section, Phoneno, EmailID, ParentEmailID from StudentProfile";
    database.connection.query(queryString, function(err, result){
      for(i=0; i<result.length; i++){
        st_info[i]={
          sregno:result[i].SRegno,
          firstName:result[i].FirstName,
          lastName:result[i].LastName,
          username:result[i].SUsername,
          password:result[i].SPassword,
          class:result[i].Class,
          section:result[i].Section,
          phoneNo:result[i].TPhoneno,
          email:result[i].EmailID,
          pemail:result[i].ParentEmailID
        }


      }
      res.render(path.join(__dirname,'../','views/layouts/infoAll.hbs'),{stInfo: st_info});
    });

  }
});

router.get('/info1', function(req, res){
  var st_info={};
  if(req.session.user){
    let queryString = "SELECT SRegno, FirstName, LastName, SUsername, SPassword, Class, Section, Phoneno, EmailID, ParentEmailID from StudentProfile";
    database.connection.query(queryString, function(err, result){
      for(i=0; i<result.length; i++){
        st_info[i]={
          sregno:result[i].SRegno,
          firstName:result[i].FirstName,
          lastName:result[i].LastName,
          username:result[i].SUsername,
          password:result[i].SPassword,
          class:result[i].Class,
          section:result[i].Section,
          phoneNo:result[i].TPhoneno,
          email:result[i].EmailID,
          pemail:result[i].ParentEmailID
        }


      }
      res.render(path.join(__dirname,'../','views/layouts/infoAll1.hbs'),{stInfo: st_info});
    });

  }
});

router.get('/infoTeachers', function(req, res){
  var ts_info={};
  if(req.session.user){
    let queryString = "SELECT TRegno, TFirstName, TLastName, TUsername, TPassword, TPhoneno, TEmailID, TSubject1, TSubject2 from TeacherProfile";
    database.connection.query(queryString, function(err, result){
      for(i=0; i<result.length; i++){
        ts_info[i]={
          regno:result[i].TRegno,
          fname:result[i].TFirstName,
          lname:result[i].TLastName,
          username:result[i].TUsername,
          password:result[i].TPassword,
          phoneNo:result[i].TPhoneno,
          email:result[i].TEmailID,
          s1:result[i].TSubject1,
          s2:result[i].TSubject2
        }
      }
      res.render(path.join(__dirname,'../','views/layouts/infoAllTeachers.hbs'),{tsInfo: ts_info});
    });
  }
});

router.get('/delete', (req, res)=>{
  res.render(path.join(__dirname, '../', 'views/layouts/delete.hbs'), {});
});

router.post('/delete', (req, res)=>{
  console.log(req.body);
  let queryString = "DELETE from StudentProfile where SRegno = ?";
  database.connection.query(queryString, req.body.sregno, function(err, result){
      if(err){
        console.log("error deleting entry");
      }
  });
  res.render(path.join(__dirname,'../','views/layouts/success.hbs'),{});
});

// router.post('/update', (req, res)=>{
//   let queryString = "";
//   database.connection.query(queryString, req.body.sregno, function(err, result){
//
//   });
// });

//router.post('fee', (res))

module.exports = router;
