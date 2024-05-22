const Form = require("../models/form.model");
const User = require("../models/user.model");
const PdfFile = require("../models/pdf.model.js");
const sendResponse = require("../shared/sendResponse");
const ApiError = require("../errors/ApiError.js");
const httpStatus = require("http-status");
const catchAsync = require("../shared/CatchAsync.js");
const fs = require("fs");
const path = require("path");

exports.formFieldCreate=catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    if(user.role=="ADMIN" || "SUPER ADMIN"){
        
      const{title,dataType,optiondata}=req.body
      console.log(title,dataType,optiondata)


      const form = await Form.create({
        
          title,
          dataType,
          optiondata
         
      });

      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Form field add successfully",
        data:form
    });


    }else{
        throw new ApiError(401, "You are unauthorized");
    }

});

exports.showField=catchAsync(async (req, res, next) => {


    const user = await User.findById(req.user._id);
    if(user.role=="ADMIN" || "SUPER ADMIN"){

        let allFieldFetch=await Form.find();
        console.log(allFieldFetch);

      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Form field fetch successfully",
        data:allFieldFetch
    });


    }else{
        throw new ApiError(401, "You are unauthorized");
    }

      
});

exports.fieldDelete=catchAsync(async (req, res, next) => {


    const user = await User.findById(req.user._id);
    if(user.role=="ADMIN" || "SUPER ADMIN"){

        let Field=await Form.findByIdAndDelete(req.params.id);
 

      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Field Deleted successfully",
        data:Field
    });


    }else{
        throw new ApiError(401, "You are unauthorized");
    }

      
});


exports.pdfSave=catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if(user.role=="ADMIN" || "SUPER ADMIN"){
    
       let pdfUrl ="";
    

    if (req.files && req.files.pdfFile) {
    
            pdfUrl = `public/uploads/pdfs/${ req.files.pdfFile[0].filename}`;
            //const publicFileUrl = createFileDetails('kyc', file.filename)
          
    } 
    console.log(pdfUrl)

    const Pdffile=await PdfFile.create({
         pdf:pdfUrl
    });

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Pdf file Upload successfully",
        data:Pdffile
    });

  }else{
        throw new ApiError(401, "You are unauthorized");
    }
});


exports.allPdfFetch=catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    if(user.role=="ADMIN" || "SUPER ADMIN"){
        const Pdffile=await PdfFile.find();
        if(Pdffile){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Pdf files fetch successfully",
                data:Pdffile
            });
        }else{
            throw new ApiError(404, "Files not found");   
        }
   
      
    }else{
        throw new ApiError(401, "You are unauthorized");
    }
});
