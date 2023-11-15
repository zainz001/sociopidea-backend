import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoute from './routes/posts.js';

import userRoute from './routes/user.js';

//import postdelete from './routes/posts.js';
const app = express();


app.use(bodyParser.json({ limit: "30mb", extend: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extend: true }));
app.use(cors());
app.use('/posts', postRoute);
app.use('/user', userRoute);

//app.use('/postsdelete', postdelete);
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false)
mongoose
  .connect("mongodb+srv://zaindon1A:zaindon1A@cluster0.epdq1ll.mongodb.net/", {
    useUnifiedTopology: true,
    useNewUrlParser: true

  })
app.get("/server", (req, res) => {
  res.send("server is running");
});
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
}); 