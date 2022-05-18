import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import cors from 'cors';
import Messages from './dbMessages.js'

const app = express();
const port = process.env.PORT || 9000;

//Pusher is used to make the mongodb realtime
const pusher = new Pusher({
  appId: "1274506",
  key: "601772c2772d84fea9ab",
  secret: "97af2a42f3009cc4c2ad",
  cluster: "eu",
  useTLS: true
});

app.use(express.json());
app.use(cors());

// cors sets up the following headers
// app.use((req, res, next)=>{
//   res.setHeader("Access-Control-Allow-Origin","*");
//   res.setHeader("Access-Control-Allow-Headers","*");
//   next();
// });

const connectionUrl = 'mongodb+srv://admin:root@cluster0.kd09k.mongodb.net/whatsappDB?retryWrites=true&w=majority';
mongoose.connect(connectionUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', ()=>{
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change)=>{
    console.log(change);

    if(change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recieved: messageDetails.recieved
      });
    }
    else {
      console.log("err triggering pusher");
    }
  });
});

app.get('/', function(req, res){
  res.send('Test check');
});

app.get('/messages/sync', (req, res)=>{
  Messages.find((err, data)=>{
    if(err)
      res.status(500).send(err);
    else
      res.status(200).send(data);
  });
});

app.post('/messages/new', (req, res)=>{
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data)=>{
    if(err)
      res.status(500).send(err);
    else
      res.status(201).send(data);
  });
});
app.listen(port, ()=>console.log(`server started at port: ${port}`));
