const controllerWrapper = require("../utils/controllerWrapper");

const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "", { skip, limit }).populate(
    "owner",
    "email"
  );
  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(result);
};

// AAAAAAAAAAAAAAAAAAAAA
const addNewContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  // console.log(req.user);
  console.log({ _id: owner });
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ _id: contactId });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addNewContact: controllerWrapper(addNewContact),
  deleteContactById: controllerWrapper(deleteContactById),
  updateContactById: controllerWrapper(updateContactById),
  updateContactStatus: controllerWrapper(updateContactStatus),
};
