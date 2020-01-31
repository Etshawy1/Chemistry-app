// jshint esversion:8
const express = require('express');
const {getAssistInfo, getCourseInfo, getCenterInfo} = require('../databaseUtils/info');
const {insertAssistant, insertCenter, insertCourse} = require('../databaseUtils/insert');
const {updateAssistData, updateCenterData, updateCourseData} = require('../databaseUtils/update');
const {deleteAssistant, deleteCourse, deleteCenter} = require('../databaseUtils/delete');
const {isauth} = require('../utils/auth');
const router = express.Router();
router.get('/', function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        res.render('admin');
    } else {
        res.redirect('/');
    }
});

router.get("/assistant", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        getAssistInfo((err, [fullnames, phones, count, assistId, assistCode, assistPassword]) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    fullnames: fullnames,
                    phones: phones,
                    assistantId: assistId,
                    assistantCode: assistCode,
                    assistantPassword: assistPassword,
                    numberofassistance: count
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

router.post("/AddAssistant", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
    console.log(req.body);
    var spaceindex = req.body.name.indexOf(" ");
    req.body.fname = req.body.name.substring(0, spaceindex);
    req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
    insertAssistant(req);
    res.redirect("/");
    }
    else {
        res.redirect('/');
    }
});

router.post("/EditAssistant", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        console.log(req.body);
        var spaceindex = req.body.name.indexOf(" ");
        req.body.fname = req.body.name.substring(0, spaceindex);
        req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
        updateAssistData(req);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});



router.post("/delete", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        console.log(req.body);
        deleteAssistant(req.body.code);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});

router.get('/course', function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        res.render('course');
    }
    else{
        res.redirect('/');
    }
});


router.get("/Coursedata", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        getCourseInfo((err, [course_name, course_id]) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    course_name: course_name,
                    course_id: course_id
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

router.post("/AddCourse", function (req, res) {
    console.log(req.body);
    const {role} = isauth(req);
    console.log(role);
    console.log(req.body);
    if (role == 'admin') {
        console.log(req.body);
        insertCourse(req.body.name);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});

router.post("/EditCourse", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        updateCourseData(req);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});



router.post("/DeleteCourse", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        deleteCourse(req.body.name);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});


router.get('/center', function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        res.render('center');
    } else {
        res.redirect('/');
    }
});


router.get("/Centerdata", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        getCenterInfo((err, center_name) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    center_name: center_name,
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

router.post("/AddCenter", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        insertCenter(req.body.name);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});


router.post("/EditCenter", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        console.log(req.body);
        updateCenterData(req);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});



router.post("/DeleteCenter", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        console.log(req.body);
        deleteCenter(req.body.name);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});

module.exports = router;