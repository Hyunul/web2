var express = require('express');
var router = express.Router();

var session = require('express-session');
var bodyParser = require('body-parser');
var FileStore = require('session-file-store')(session);

var authRouter = require('./auth.js');
var authCheck = require('./authCheck.js');
var boardRouter = require('./board.js');

// 인증 라우터
router.use('/board', boardRouter);
router.use('/auth', authRouter);
router.use(bodyParser.urlencoded({ extended: false }));

router.use(
    session({
        secret: '~~~', // 원하는 문자 입력
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
    })
);

router.get('/', (req, res) => {
    if (!authCheck.isOwner(req, res)) {
        // 로그인 안되어있으면 로그인 페이지로 이동시킴
        res.redirect('/auth/login');
        return false;
    } else {
        // 로그인 되어있으면 메인 페이지로 이동시킴
        res.redirect('/main');
        return false;
    }
});

// 메인 페이지
router.get('/main', (req, res) => {
    if (!authCheck.isOwner(req, res)) {
        // 로그인 안되어있으면 로그인 페이지로 이동시킴
        res.redirect('/auth/login');
        return false;
    } else {
        res.redirect('/board/list');
    }
});

module.exports = router;
