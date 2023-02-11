import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  content: String,
  userId:{
    type: String,
    ref:'User',
},
});

const Post = mongoose.model('Post', postSchema);
export default Post;
