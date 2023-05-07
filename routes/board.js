var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('./db.js');
const { error } = require('console');

router.get('/write', function (req, res) {
    var title = '글쓰기';
    res.render('write', { title: title });
});

router.get('/list', function (req, res) {
    res.redirect('/board/list/1');
});

router.get('/list/:page', function (req, res) {
    var page = req.params.page;
    var sql = 'select title, boss from board';

    db.query(sql, function (err, rows) {
        if (err) console.error('err : ' + err);
        res.render('board', { title: '타이틀', rows: rows });
    });
});

router.post('/write_process', function (req, res) {
    var title = req.body.title;
    var boss = req.body.boss;

    db.query('insert into board(title, boss) values (?, ?)', [title, boss], function (error, result) {
        if (error) throw error;
        res.redirect('/board/list');
    });
});

module.exports = router;
