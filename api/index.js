import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import translateRoute from './routes/translate.route.js'
import summaryRoute from './routes/summary.route.js'
import resetRoute from './routes/reset.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors'

// import * as path from 'path';
dotenv.config();
const DB = 'mongodb+srv://pranalabdhe:dUeCSnMlo07DMgDU@cluster0.kjyfloj.mongodb.net/';

mongoose
  .connect(DB)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
// app.use(cors(
//   {
//     origin:['https://medium-blog-2025.vercel.app'],
//     methods:['POST', 'GET','PUT', 'PATCH', 'DELETE'],
//     credentials:true
//   }
// ))

app.use(cors(
  {
    origin: 'http://localhost:5173', // or http://localhost:3000
    credentials: true, // 🔴 Important to allow cookies
  }
))
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
// app.use('/api/textToSpeechfun',translateRoute);
// app.use('/api/summaryFun' ,summaryRoute)
app.use('/api/reset-password' ,resetRoute)





app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
