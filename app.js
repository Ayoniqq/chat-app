const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const DBLocal = 'mongodb://127.0.0.1:27017/chat-app';
const bodyParser = require('body-parser');
const Chat = require('./models/chatmsg');
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', () => {
    console.log('A User is connected');
})

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/* ---------------<--MONGO DB CONNECTION -->-------------------------*/

const mongoose = require('mongoose');
mongoose.set('strictQuery', true); //Ensure this code comes before Mongoose connection below

//mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp') //, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(DBLocal)
    .then(() => {
        console.log("MONGO DB CONNECTION OPEN");
    })
    .catch((err) => {
        console.log("OH NO: MONGO DB ENCOUNTERED ERROR:");
        console.log(err);
    })

/* ---------------<--END OF MONGO DB CONNECTION -->-------------------------*/

app.get('/', (req,res) => {
    res.send('WORKING');
})

//DISPLAY MESSAGES
app.get('/chats', (req,res) => {
    Chat.find({}, (err, messages) => {
        res.send(messages);
    })
})
app.post('/chats', async (req, res) => {
    try{
    const chat = new Chat(req.body);
    await chat.save()

    const censored = await chat.findOne({message:'badword'});
    if(censored) await chat.remove({_id: censored.id});
    else io.emit('message', req.body);
    res.sendStatus(200);
    }
    catch(error){
        res.sendStatus(500);
        return console.log('error', error);
    }
    finally{
        console.log('Message Send');
    }

    
    
    ((err) => {
        if(err) sendStatus(500);
        res.sendStatus(200);
    })
})


app.listen(PORT, () => {
    console.log(`LISTENING ON PORT: ${PORT}`);
})