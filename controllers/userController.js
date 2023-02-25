const { User } = require("../models");

module.exports = {
    // Gets all users
    getUsers (req, res) {
        User.find()
            .then((users) => res.status(200).json(users))
            .catch((err) => res.status(500).json(err));
    },
};