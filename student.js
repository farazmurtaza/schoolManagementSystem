const path = require('path');
const express = require('express');
const router = express.Router();
const database = require('../database');

router.use(express.static(path.join(__dirname,'../','public')));

router.get('/info', (req, res)=>{
  res.render(path.join(__dirname,'../','views/layouts/studentInfo.hbs'),{});
});

router.get('/info1', (req, res)=>{
  res.render(path.join(__dirname,'../','views/layouts/studentInfo1.hbs'),{});
});

router.post('/info1', function(req, res){
  //if(req.session.user){
  if(req.body.option=='show'){


  var st_info_indv=[];
  //if(req.session.user){
    let queryString = "SELECT SRegno, FirstName, LastName, SUsername, SPassword, Class, Section, Phoneno, EmailID, ParentEmailID from StudentProfile where SRegno = ?";
    database.connection.query(queryString,[req.body.sregno], function(err, result){
      if(err) throw err;

       if(result[0]){
        st_info_indv={
          sregno:result[0].SRegno,
          firstName:result[0].FirstName,
          lastName:result[0].LastName,
          username:result[0].SUsername,
          password:result[0].SPassword,
          class:result[0].Class,
          section:result[0].Section,
          phoneNo:result[0].Phoneno,
          email:result[0].EmailID,
          pemail:result[0].ParentEmailID
        }
        res.render(path.join(__dirname,'../','views/layouts/student1.hbs'),{stInfoIndv: st_info_indv});
       }
      else {
         res.send("User not found");
       }
    });
  }
  else{
    res.redirect(307, '/admin/delete');
  }
  //}
  //res.send("You are not logged in");
});

router.post('/info', function(req, res){
  //if(req.session.user){
  if(req.body.option=='show'){


  var st_info_indv=[];
  //if(req.session.user){
    let queryString = "SELECT SRegno, FirstName, LastName, SUsername, SPassword, Class, Section, Phoneno, EmailID, ParentEmailID from StudentProfile where SRegno = ?";
    database.connection.query(queryString,[req.body.sregno], function(err, result){
      if(err) throw err;

       if(result[0]){
        st_info_indv={
          sregno:result[0].SRegno,
          firstName:result[0].FirstName,
          lastName:result[0].LastName,
          username:result[0].SUsername,
          password:result[0].SPassword,
          class:result[0].Class,
          section:result[0].Section,
          phoneNo:result[0].Phoneno,
          email:result[0].EmailID,
          pemail:result[0].ParentEmailID
        }
        res.render(path.join(__dirname,'../','views/layouts/student.hbs'),{stInfoIndv: st_info_indv});
       }
      else {
         res.send("User not found");
       }
    });
  }
  else{
    res.redirect(307, '/admin/delete');
  }
  //}
  //res.send("You are not logged in");
});

router.post('/profile', function(req, res){
  //if(req.session.user){


  var st_info_indv=[];
  //if(req.session.user){
    let queryString = "SELECT SRegno, FirstName, LastName, SUsername, SPassword, Class, Section, Phoneno, EmailID, ParentEmailID from StudentProfile where SRegno = ?";
    database.connection.query(queryString,[req.body.regno], function(err, result){
      if(err) throw err;

       if(result[0]){
        st_info_indv={
          sregno:result[0].SRegno,
          firstName:result[0].FirstName,
          lastName:result[0].LastName,
          username:result[0].SUsername,
          password:result[0].SPassword,
          class:result[0].Class,
          section:result[0].Section,
          phoneNo:result[0].Phoneno,
          email:result[0].EmailID,
          pemail:result[0].ParentEmailID
        }
        res.render(path.join(__dirname,'../','views/layouts/studentProfile.hbs'),{stInfoIndv: st_info_indv});
       }
      else {
         res.send("User not found");
       }
    });
  //}
  //res.send("You are not logged in");
});

router.post('/beforeUpdate', (req, res)=>{
  res.render(path.join(__dirname,'../','views/layouts/update1.hbs'),{oldValues: req.body});
 });

router.post('/update', (req, res)=>{

  let queryString = "UPDATE StudentProfile SET ? where SRegno = ?";
  console.log(req.body);
  const values = {
    FirstName: req.body.newFname,
    LastName: req.body.newLname,
    SUsername: req.body.newUname,
    Class:req.body.newClass,
    Section:req.body.newSection,
    Phoneno: req.body.newPhone,
    EmailID: req.body.newMail,
    };
    console.log(req.body.regno);
  database.connection.query(queryString, [values, req.body.regno], function(err, result){
    if(err){
      console.log("error in update");
    }
  });
  res.render(path.join(__dirname,'../','views/layouts/success.hbs'),{});

});


module.exports = router;
