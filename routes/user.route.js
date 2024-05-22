const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const { checkUser } = require("../middlewares/checkuser.js");
const userController = require("../controllers/user.controller.js");

router.post("/register", configureFileUpload(), userController.userRegister);
router.post("/verify-email", configureFileUpload(), userController.verifyEmail);
router.post("/login", configureFileUpload(), userController.userLogin);
router.post("/forgot-password", configureFileUpload(), userController.forgotPassword);
router.post("/reset-password", configureFileUpload(), userController.resetPassword);

router.get("/loggeduser",checkUser,configureFileUpload(), userController.loggedUserData);

router.post("/change-password", checkUser, configureFileUpload(), userController.changePassword);

router.get("/all/admin/account",checkUser,userController.allAdmin);

router.delete("/admin-delete/:id",checkUser,userController.deleteAdmin);
module.exports = router;