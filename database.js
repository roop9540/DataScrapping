const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/yourDB",{ useNewUrlParser: true }).then((e)=>{
console.log("Connected to mongo")
});
const schema = new mongoose.Schema({
    // title: String,
    // rating: String,
    url:String,
  });
  
  // Create a Mongoose model
  exports.Model = mongoose.model('Model', schema);