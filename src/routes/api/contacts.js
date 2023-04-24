const express = require("express");

const controller = require("../../controllers/contacts-controllers");

const {
  validatePostBody,
  validatePutBody,
  validatePatchBody,
} = require("../../utils/validateBody");

const validateId = require("../../utils/validateId");

const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../../models/contact");

const { authenticate } = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, controller.getAllContacts);

router.get("/:contactId", authenticate, validateId, controller.getContactById);

router.post(
  "/",
  authenticate,
  validatePostBody(addContactSchema),
  controller.addNewContact
);

router.delete(
  "/:contactId",
  authenticate,
  validateId,
  controller.deleteContactById
);

router.put(
  "/:contactId",
  authenticate,
  validateId,
  validatePutBody(updateContactSchema),
  controller.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateId,
  validatePatchBody(updateStatusSchema),
  controller.updateContactStatus
);

module.exports = router;
