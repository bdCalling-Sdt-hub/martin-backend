const Form = require("../models/form.model");
const User = require("../models/user.model");
const PdfFile = require("../models/pdf.model.js");
const sendResponse = require("../shared/sendResponse");
const ApiError = require("../errors/ApiError.js");
const httpStatus = require("http-status");
const catchAsync = require("../shared/CatchAsync.js");
const fs = require("fs");
const path = require("path");

exports.formFieldCreate = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user.role == "ADMIN" || "SUPER ADMIN") {
      const { title, dataType, optiondata, fieldNumber } = req.body;
      console.log(title, dataType, optiondata);
  
      const form = await Form.create({
        title,
        dataType,
        optiondata,
        fieldNumber,
      });
  
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Form field add successfully",
        data: form,
      });
    } else {
      throw new ApiError(401, "You are unauthorized");
    }
  });
  
  exports.showField = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user.role == "ADMIN" || "SUPER ADMIN") {
      let allFieldFetch = await Form.find().sort({ fieldNumber: "asc" });
  
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Form field fetch successfully",
        data: allFieldFetch,
      });
    } else {
      throw new ApiError(401, "You are unauthorized");
    }
  });
  
  exports.getFieldNumber = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user.role == "ADMIN" || "SUPER ADMIN") {
      let total = await Form.countDocuments();
  
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Total field count retrieved successfully",
        data: total,
      });
    } else {
      throw new ApiError(401, "You are unauthorized");
    }
  });

  
exports.fieldDelete = catchAsync(async (req, res, next) => {


    const user = await User.findById(req.user._id);
    if (user.role == "ADMIN" || "SUPER ADMIN") {

        let Field = await Form.findByIdAndDelete(req.params.id);


        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Field Deleted successfully",
            data: Field
        });


    } else {
        throw new ApiError(401, "You are unauthorized");
    }


});


exports.pdfSave = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user.role == "ADMIN" || "SUPER ADMIN") {

        let pdfUrl = "";


        if (req.files && req.files.pdfFile) {

            pdfUrl = `public/uploads/pdfs/${req.files.pdfFile[0].filename}`;
            //const publicFileUrl = createFileDetails('kyc', file.filename)

        }
        console.log(pdfUrl)

        const Pdffile = await PdfFile.create({
            pdf: pdfUrl
        });

        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Pdf file Upload successfully",
            data: Pdffile
        });

    } else {
        throw new ApiError(401, "You are unauthorized");
    }
});


exports.allPdfFetch = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    if (user.role == "ADMIN" || "SUPER ADMIN") {
        const Pdffile = await PdfFile.find();
        if (Pdffile) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Pdf files fetch successfully",
                data: Pdffile
            });
        } else {
            throw new ApiError(404, "Files not found");
        }


    } else {
        throw new ApiError(401, "You are unauthorized");
    }
});



exports.fileEdit = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user.role == "ADMIN" || "SUPER ADMIN") {

        const formField = await Form.findById(req.params.id);
        if (formField) {
            const updatedData = req.body;
            const formField = await Form.findByIdAndUpdate(req.params.id, updatedData, { new: true });
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Form field updated successfully",
                data: formField
            });
        }
        else {
            throw new ApiError(404, "Field not found");
        }
    } else {
        throw new ApiError(401, "You are unauthorized");
    }

});

