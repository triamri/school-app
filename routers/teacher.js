const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.teacher.findAll({order:[['id','ASC']] ,include: [db.subject] }).then((dataTeachers) => {
        res.render('teacher', { dataTeachers });
    }).catch((err) => {
        res.send(err);
    });
});

router.get('/add', (req, res) => {
    db.subject.findAll().then((rows) => {
        res.render('addteacher', { rows, error: null });
    })
});

router.post('/add', (req, res) => {
    db.teacher.create(req.body).then((dataTeachers) => {
        res.redirect('/teachers');
    }).catch((err) => {
        res.render('addteacher', { error: err.errors[0].message });
    })

});

router.get('/edit/:id', (req, res) => {
    db.teacher.findById(req.params.id).then((dataTeachers) => {
        db.subject.findAll().then((dataSubjects) => {
            res.render('editteacher', { dataTeachers, dataSubjects ,error: null });
        });
    }).catch((err) => {
        res.send(err);
    });
});

router.post('/edit/:id', (req, res) => {
    db.teacher.update(req.body, { where: { id: req.params.id } }).then((dataTeachers) => {
        res.redirect('/teachers');
    }).catch((err) => {
        db.student.findById(req.params.id).then((dataTeachers) => {
            res.render('editteacher', { dataTeachers, error: err.errors[0].message });
        })
    });
});

router.get('/delete/:id', (req, res) => {
    db.teacher.destroy({ where: { id: req.params.id } }).then((dataTeachers) => {
        res.redirect('/teachers');
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router