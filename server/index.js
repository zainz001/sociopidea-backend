import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoute from './routes/posts.js';
const app = express();


app.use(bodyParser.json({ limit: "30mb", extend: true }));
app.use(cors());
app.use('/posts', postRoute)
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false)
mongoose
  .connect("mongodb://localhost:27017/MERN", {
    useUnifiedTopology: true,
    useNewUrlParser: true

  })
app.get("/server", (req, res) => {
  res.send("server is running");
});
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
}); 