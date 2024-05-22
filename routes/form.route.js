const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const { checkUser } = require("../middlewares/checkuser.js");
const formController = require("../controllers/form.controller.js");

router.post("/form-field-add",checkUser, formController.formFieldCreate);

router.post("/pdf-save",checkUser,configureFileUpload(), formController.pdfSave);
router.get("/all/pdf-fetch",checkUser,formController.allPdfFetch);

router.get("/form-field-fetch",checkUser, formController.showField);
router.delete("/form-field-delete/:id",checkUser,formController.fieldDelete);
module.exports = router;