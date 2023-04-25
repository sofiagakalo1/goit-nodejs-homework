const { isValidObjectId } = require("mongoose").Types;
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId.isValid(contactId)) {
    throw HttpError(404, `id ${contactId} has invalid format`);
  }

  next();
};

module.exports = isValidId;
