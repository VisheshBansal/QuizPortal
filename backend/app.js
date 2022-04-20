require('dotenv').config();
require('./config/database');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
//const cors = require('cors');
const Info = require('./api/models/info');

const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json({ limit: '50mb' }));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//app.use(cors());

// ADD ROUTERS

app.use('/user', require('./api/routers/auth'));
app.use('/quiz', require('./api/routers/quiz'));



app.get('/checkServer', (req, res) => {
    return res.status(200).json({
        message: 'Server is up and running',
    });
});


//This function will give a 404 response if an undefined API endpoint is fired
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

//

//sockets

//to keep connection alive
function sendHeartbeat() {
    setTimeout(sendHeartbeat, 8000);
    io.sockets.emit('ping', { beat: 1 });
}

io.on('connection', async (sc) => {
    console.log(`Socket ${sc.id} connected.`);
    sc.on('data', async (data) => {
        const info = new Info({
            _id:  new mongoose.Types.ObjectId,
            info:data
        });
        info.save()
            .then(()=>{
                console.log(info);
            });
    });
    // sc.on("user",async (id)=>{
    //   const {name} = await User.findById(id)
    //   sc.emit("start",name)
    //   console.log(id)
    // })

    sc.on('pong', function () {
        console.log('Pong received from client');
    });
    sc.on('disconnect', () => {
        console.log(`Socket ${sc.id} disconnected.`);
    });

 
    setTimeout(sendHeartbeat, 8000);
});

const PORT = process.env.PORT || 4000;

//Start the server
http.listen(PORT, function () {
    console.log(`listening on PORT: ${PORT}`);
});

