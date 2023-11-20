import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoute from './routes/posts.js';
import userRoute from './routes/user.js';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json({ limit: '100mb', extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.connect("mongodb+srv://zaindon1A:zaindon1A@cluster0.epdq1ll.mongodb.net/")
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
  }
}

// Singleton instance
const databaseInstance = new Database();

app.get("/server", (req, res) => {
  res.send("server is running");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});




// the singleton pattern is used to ensure that there is only one connection to the MongoDB database, and this connection is shared throughout the application.

// Let's break down how the singleton pattern is applied in your code:

// Singleton Class (Database):

// javascript
// Copy code
// class Database {
//   constructor() {
//     this.connect();
//   }

//   connect() {
//     mongoose.connect("mongodb+srv://zaindon1A:zaindon1A@cluster0.epdq1ll.mongodb.net/")
//       .then(() => {
//         console.log('Connected to MongoDB');
//       })
//       .catch((error) => {
//         console.error('Error connecting to MongoDB:', error);
//       });
//   }
// // }
// Here, you define a class called Database. The constructor of this class is responsible for calling the connect method, which establishes the connection to MongoDB using Mongoose.

// Singleton Instance:

// javascript
// Copy code
// const databaseInstance = new Database();
// The databaseInstance variable holds a single instance of the Database class. This instance is created when the application starts, thanks to the new Database() instantiation. The idea is to create only one instance of Database and reuse it throughout the application.

// Using the Singleton Instance:

// javascript
// Copy code
// const PORT = process.env.PORT || 5000;

// mongoose.set("strictQuery", false);

// // Singleton instance
// const databaseInstance = new Database();
// In your main application code, you create a single instance of the Database class named databaseInstance. This instance is used to establish the connection to MongoDB.