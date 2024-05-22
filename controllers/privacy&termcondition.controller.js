const Privacy = require("../models/privacy.model.js");
const Term = require("../models/term.model.js");
const User = require("../models/user.model");
const sendResponse = require("../shared/sendResponse");
const ApiError = require("../errors/ApiError.js");
const httpStatus = require("http-status");
const catchAsync = require("../shared/CatchAsync.js");
const fs = require("fs");
const path = require("path");

exports.privacy=catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    
    if(user.role=="ADMIN" || "SUPER ADMIN"){

        let privacyPolicy = await Privacy.findOne();

        if(!privacyPolicy){
            const privacy = await Privacy.create({
        
                privacycontext:req.body.privacycontext
               
            });
      
            return sendResponse(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: "Privacy policy add successfully",
              data:privacy
          });
        }else{
            privacyPolicy.privacycontext=req.body.privacycontext
            await privacyPolicy.save();

            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Privacy updated successfully",
            });
        }

          
    }else{
        throw new ApiError(401, "You are unauthorized");    
    }
});


exports.fetchPrivacy=catchAsync(async (req, res, next) => {
     
    let privacy = await Privacy.findOne();
    if(privacy){
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Data get successfully",
            data:privacy
        });
    }else{
        throw new ApiError(404, "Don't have any data in privacy"); 
        
        
    }  

})




exports.termAndCondition=catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    
    if(user.role=="ADMIN" || "SUPER ADMIN"){

        let term = await Term.findOne();

        if(!term){
            const term = await Term.create({
        
                termcontext:req.body.termcontext
               
            });
      
            return sendResponse(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: "Term and condition add successfully",
              data:term
          });
        }else{
            term.termcontext=req.body.termcontext
            await term.save();

            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Term and condition updated successfully",
            });
        }

          
    }else{
        throw new ApiError(401, "You are unauthorized");    
    }
});


exports.fetchTerm=catchAsync(async (req, res, next) => {
     
    let term = await Term.findOne();
    if(term){
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Data get successfully",
            data:term
        });
    }else{
        throw new ApiError(404, "Don't have any data in term and condition"); 
    }  
})
