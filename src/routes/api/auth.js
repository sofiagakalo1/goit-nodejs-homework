const express = require("express");

const router = express.Router();

const { validatePostBody } = require("../../utils/validateBody");

const { registerSchema, loginSchema } = require("../../models/user");

const controller = require("../../controllers/auth-controllers");

const { authenticate } = require("../../middlewares/authenticate");

router.post("/register", validatePostBody(registerSchema), controller.register);
router.post("/login", validatePostBody(loginSchema), controller.login);
router.get("/current", authenticate, controller.getCurrent);
router.post("/logout", authenticate, controller.logout);

module.exports = router;
