const { Schema, mongo } = require("mongoose");
const mongoose = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: `${Date.prototype.getMonth()}, ${Date.prototype.getDay()}, ${Date.prototype.getFullYear()}`
        }
    }
);

module.exports = reactionSchema;