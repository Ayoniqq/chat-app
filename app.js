import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import { fileURLToPath } from "url";
import {dirname} from "path";
import onSocket from "./socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);



app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.use(express.static(__dirname + '/public'));

const io = new Server(httpServer);
const PORT = process.env.PORT || 8080;
onSocket(io);




/* ---------------<--MONGO DB CONNECTION -->-------------------------*/

// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);

// mongoose.connect(DBLocal)
//     .then(() => {
//         console.log("MONGO DB CONNECTION OPEN");
//     })
//     .catch((err) => {
//         console.log("OH NO: MONGO DB ENCOUNTERED ERROR:");
//         console.log(err);
//     })

/* ---------------<--END OF MONGO DB CONNECTION -->-------------------------*/

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT: ${PORT}`);
})