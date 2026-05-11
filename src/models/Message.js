const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },

    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true
    },

    content: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);