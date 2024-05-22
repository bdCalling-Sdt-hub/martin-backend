const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
    {
        pdf: {
            type: String,
            required: true,
            trim: true,
        },
        
     },
    { timestamps: true }
);

const PdfFile = mongoose.model("PdfFile", pdfSchema);
module.exports=PdfFile;