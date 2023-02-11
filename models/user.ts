import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  avatar: String,
  fullName: String,
});

const User = mongoose.model('User', userSchema);
export default User;
