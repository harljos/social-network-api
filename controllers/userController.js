const { User } = require("../models");

module.exports = {
    // Gets all users
    getUsers (req, res) {
        User.find()
            .then((users) => res.status(200).json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Gets a single user by id
    getSingleUser (req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "No user with that ID" })
                }
                else {
                    res.status(200).json(user)
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    // Create new user
    createUser (req, res) {
        User.create(req.body)
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Updates a user by id
    updateUser (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.courseId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => {
            if (!course) {
                res.status(404).json({ message: "No user with that ID "});
            }
            else {
                res.status(200).json(user);
            }
        })
        .catch((err) => res.status(500).json(err));
    },
    // Deletes user by id
    deleteUser (req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "No user with the ID" })
                }
            })
            .then(() => res.status(200).json({ message: "User has been deleted" }))
            .catch((err) => res.status(500).json(err));
    }
};