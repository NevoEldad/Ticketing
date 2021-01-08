import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  passwor: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

export { User };
