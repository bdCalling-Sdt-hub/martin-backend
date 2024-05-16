const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const { checkUser } = require("../middlewares/checkuser.js");
const termPrivacyController = require("../controllers/privacy&termcondition.controller.js");

router.post("/term",checkUser,configureFileUpload(), termPrivacyController.termAndCondition);
router.post("/privacy",checkUser,configureFileUpload(), termPrivacyController.privacy);


router.get("/term",configureFileUpload(), termPrivacyController.fetchTerm);
router.get("/privacy",configureFileUpload(),termPrivacyController.fetchPrivacy);


module.exports = router;