const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.Mongo_string)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,

  bio: {
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
  },

  rating: { type: Number, default: 0 },  

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    }
  ],

  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'answer' // ✅ Reference to answer model
    }
  ],

  bestAnswersCount: {
    type: Number,
    default: 0
  },

  likedQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    }
  ],


  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post'
    }
  ]
});

userSchema.plugin(plm);



module.exports = {
  userModel: mongoose.model('user', userSchema)
};
