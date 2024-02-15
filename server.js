import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: './config.env' });
const dbPassword = '';
const db = process.env.DATABASE.replace('<PASSWORD>', dbPassword);
mongoose.connect(db).then(() => {
  console.log('Db connection successful');
});

app.listen(3001);
