const mongoose = require("mongoose");

const privacySchema = new mongoose.Schema(
    {
        privacycontext: {
            type: String,
            required: true,
            trim: true,
        },
        
     },
    { timestamps: true }
);

const Privacy = mongoose.model("Privacy", privacySchema);
module.exports=Privacy;