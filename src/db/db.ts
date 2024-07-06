import { randomUUID } from "crypto";

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mockAPI');

console.log("db connection successful!");

const userSchema = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
});

const productSchema = new mongoose.Schema({
  id: {type: String, default: randomUUID()},
  name: {type: String, required: true},
  description: {type: String},
  price: {type: Number, required: true},
  thumbnails: {type: [String]}, //will contain images
  rating: {type: Number},
})

const userModel = mongoose.model("User", userSchema);
const productModel = mongoose.model("Product", productSchema);

export {userModel, productModel};