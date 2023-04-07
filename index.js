const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = 8520;
const server = express();
const db = require('./config/mongoose');

// const mongoose=require('mongoose');
// const mongoose = require('mongoose');
// const db = 'mongodb+srv://darshan:darshan@darshan-re3gq.mongodb.net/morsy'
// mongoose.connect(db, { 
//         // useCreateIndex: true, 
//         // useFindAndModify: false, 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//       })
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err));

// const flash = require('flash');
var passport = require('passport');
var passportLocal = require('./config/passport-local');
var passportLocals = require('./config/passport-local-manager');
const passportLocalStudent = require('./config/passport_local_student_strategy');
var flash = require('connect-flash');
var custom = require('./config/middleware');
var session = require('express-session');
// const cors = require('cors');
// server.use(cors());
server.use(cookieParser());
server.use(urlencoded());
// const git=require('git')

server.use(express.static('assets'));

server.use(session({
    name : "morsy",
    secret : "Devloper",
    resave : true,
    saveUninitialized : false,
    cookie : {
        maxAge : 50*10*100*10000
    }
}));
server.use(flash());
server.use(custom.setFlash)
server.use(passport.initialize());
server.use(passport.session());
server.use(passport.setAuthenticatedUser)
server.use('/', require('./routes/admin_routes'));
server.use('/manager', require('./routes/manager_routes'));
server.use('/', require('./routes/student_routes'));
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname,'views'));
server.use('/uploads/admin', express.static(__dirname+'/uploads/admin'));
server.listen(port, () => { console.log("server is running on port =",port); });