const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render("index");
};

exports.addStore = (req, res) => {
  res.render("editStore", { title: "Add Store" });
};

exports.createStore = async (req, res) => {
  const store = await new Store(req.body).save();

  req.flash("success", `Successfully created ${store.name}`);
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  console.log(stores);
  res.render("stores", { title: "Stores", stores });
};

exports.editStores = async (req, res) => {
  //1. find the store by given id
  //2. confirm the owner of the store
  //3. render out the edit for,
  const store = await Store.findOne({ _id: req.params.id });
  res.render("editStore", { title: `${store.name}`, store });
};

exports.updateStores = async (req, res) => {
  const store = await Store.findOneAndUpdate(
    {
      _id: req.params.id
    },
    req.body,
    {
      new: true, //return the new store return the new store instead of old store
      runValidators: true
    }
  ).exec();

  req.flash('success', `Succesfully updated <strong>${store.name}</strong>. <a href='/stores/${store.slug}'>View Store </a>`)
  res.redirect(`/stores/${store.id}/edit`)
};
