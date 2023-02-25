const { Thought } = require("../models");

module.exports = {
    // Gets all thoughts
    getThoughts (req, res) {
        Thought.find()
        .then((thoughts) => res.status(200).json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Gets a single thought
    getSingleThought (req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought with that Id"});
            }
            else {
                res.status(200).json(thought)
            }
        })
        .catch((err) => res.status(500).json(err));
    }
};