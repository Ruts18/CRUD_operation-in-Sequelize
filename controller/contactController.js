const db = require('../models');
const Contact= require('../models/contact');
const { create } = require('../models/contact');
//Using build method
const addContact = (req, res) => {
  const data = db.Contact.build({ permenent_address:req.body.permenent_address, current_address:req.body.current_address });
  data.save()
      console.log("Data saved in the database");
      console.log(data.toJSON());
      res.status(200).json(data.toJSON());
};
const getContacts = async (req, res) => {
    const data = await db.Contact.findAll();
    res.status(200).json({ data: data });
};
const getContact = async (req, res) => {
    const data = await db.Contact.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ data: data });
  }
const postContact = async (req, res) => {
  var postData = req.body;
  if (postData.length > 1) {
    var data = await db.Contact.bulkCreate(postData);
  } else {
    var data = await db.Contact.create(postData);
  }
  res.status(200).json({ data: data });
};

const deleteContact = async (req, res) => {
  const data = await db.Contact.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({ data: data });
};

const patchContact = async (req, res) => {
  var updatedata = req.body;
  const data = await db.Contact.update(updatedata, {
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({ data: data });
};

module.exports = {
  addContact,
  getContacts,
  getContact,
  postContact,
  deleteContact,
  patchContact
};
