const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
//socket 
const http = require('http');
const { allowedNodeEnvironmentFlags } = require('process');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.get('/chat', (req, res) =>{
    res.sendFile(__dirname + '/views/chat.html');
});

io.on('connection', (socket) =>{
    socket.on('chat', (msg) =>{
        io.emit('chat', msg);
        console.log('Mensaje: '+msg);
    })
});
app.use(express.static('public'));





// npm run dev
// Inicializadores

require('./config/passport');

// Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    
}));


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; 
    next();
});


// Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
