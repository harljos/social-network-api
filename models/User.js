const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        usernmae: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                }
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.virtual("friendCount")
// getter for number of friends
.get(function () {
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;