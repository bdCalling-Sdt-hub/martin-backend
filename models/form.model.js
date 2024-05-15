const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        dataType: {
            type: String,
            enum: ["CHECKBOX","RADIO","CHOOSE","IMAGE","DATE","INPUT"],
            required: true,
            trim: true,
           
        },

        optiondata:{
           type:[],
           required:true
          
        },
      
      },
    { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
module.exports =Form;