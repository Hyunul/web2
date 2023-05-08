var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('./db.js');
var auth = require('./auth.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const { error } = require('console');

router.use(
    session({
        secret: '~~~', // 원하는 문자 입력
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
    })
);

router.get('/list', function (req, res) {
    res.redirect('/board/list/1');
});

router.get('/list/:page', function (req, res) {
    var page = req.params.page;
    var sql = 'select title, boss, username from board';

    db.query(sql, function (err, rows) {
        if (err) console.error('err : ' + err);
        res.render('board', { title: '타이틀', rows: rows });
    });
});

router.get('/write', function (req, res) {
    var title = '글쓰기';
    res.render('write', { title: title });
});

router.post('/write_process', function (req, res) {
    var title = req.body.title;
    var boss = req.body.boss;
    const username = req.session.nickname;

    const sql = 'insert into board(title, boss, username) values (?, ?, ?)';
    const values = [title, boss, username];

    db.query(sql, values, function (error, result) {
        if (error) throw error;
        res.redirect('/board/list');
    });
});

router.get('/delete/:title', function (req, res) {
    var title = decodeURIComponent(req.params.title);
    var sql = 'delete from board where title=?';
    var values = [title];

    db.query(sql, values, function (error, result) {
        if (error) throw error;
        res.redirect('/board/list');
    });
});

module.exports = router;
