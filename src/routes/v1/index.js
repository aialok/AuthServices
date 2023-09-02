const express = require("express");
const UserController = require("../../controller/user-controller");
const authValidater = require("../../middlewares/auth-request-validators");

const router = express.Router();

router.post("/signup", authValidater.validUserauth, UserController.create);
router.post("/signin", authValidater.validUserauth, UserController.signIn);
router.delete("/delete", UserController.destroy);
router.get("/authentication", UserController.isAuthenticated);

router.get("/admin", authValidater.validAdminReq, UserController.isAdmin);

module.exports = router;
