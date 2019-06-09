var express = require('express');
var router = express.Router();
var app=express();
var Controller= require('../Controller/Main');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'System Login' });
});

router.post('/loginmethod',Controller.loginandGetToken);
var varifyToken= require('../TokenVerify');
/*

router.get('/dashboard',Controller.tokenverification, function(req, res, next) {
  res.render('dashboard', { title: 'Admin Dashboard' });
});

router.get('/addpatient',Controller.tokenverification, function(req, res, next) {
  res.render('addpatient', { title: 'Admin Dashboard | Data Entry' });
});

router.get('/schedulepatient',Controller.tokenverification, function(req, res, next) {
  res.render('schedulepatient', { title: 'Admin Dashboard | Data Entry' });
});

router.get('/scheduleindex',Controller.tokenverification, function(req, res, next) {
  res.render('scheduleview', { title: 'Admin Dashboard | Data Entry' });
});
*/

router.get('/itemcrud',Controller.tokenverification, Controller.itemcrud);
router.get('/users',Controller.tokenverification, Controller.patientview);
router.get('/slots',Controller.tokenverification, Controller.allslots);

router.get('/testview', Controller.testcrud);
///////////backend Logic
router.post('/adduserlogic',Controller.adduser);
router.post('/deleteslot',Controller.removeslot);
router.post('/addgrouplogic',Controller.addgroup);
router.post('/addslot',Controller.addslot);
router.post('/userlogin',Controller.userlogin,Controller.loginandGetToken);
module.exports = router;
