const mongoose = require("mongoose");

const termSchema = new mongoose.Schema(
    {
        termcontext: {
            type: String,
            required: true,
            trim: true,
        },
        
     },
    { timestamps: true }
);

const Term = mongoose.model("Term", termSchema);
module.exports=Term;