const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const express = require('express');
const ejs = require('ejs');
const io = socketIo(server);
const PORT = 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

const sessionMiddleware = session({
    store: new SQLiteStore,
    secret: 'MUG',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});

app.use(sessionMiddleware);



const server = app.listen(PORT, () => {})