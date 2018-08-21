const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a Store Name"
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

//before saving, generate slugs, then save
storeSchema.pre("save", function(next) {
  //isModified is part of mongoose
  if (!this.isModified("name")) {
    next(); //skip
    return; //stop function from running
  }
  this.slug = slug(this.name);
  next();

  //come back later to make slugs more unique
});

module.exports = mongoose.model("Store", storeSchema);
