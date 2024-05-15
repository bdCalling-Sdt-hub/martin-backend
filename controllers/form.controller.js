const Form = require("../models/form.model");
const User = require("../models/user.model");
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
