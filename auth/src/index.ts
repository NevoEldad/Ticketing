import mongoose from 'mongoose';
import { app } from './app';
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Could not get JWT_KEY');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
