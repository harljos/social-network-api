const { Thought, User } = require("../models");

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
    },
    // Creates a new thought
    createThought (req, res) {
        Thought.create(
            { thoughtText: req.body.thoughtText },
            { username: req.body.username }
        )
        .then(async (thought) => {
            await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $push: { thoughts: thought._id}},
                { runValidators: true, new: true }
            )
            res.status(200).json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },
    // Updates thought by id
    updateThought (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought with that ID "});
            }
            else {
                res.status(200).json(thought);
            }
        })
        .catch((err) => res.status(500).json(err));
    },
    // Deletes thought by id
    deleteThought (req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: "No thought with that ID "});
                }
            })
            .then(() => res.status(200).json({ message: "Thought has been deleted" }))
            .catch((err) => res.status(500).json(err));
    },
    // creates reaction
    createReaction (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: {
                reactionBody: req.body.reactionBody,
                username: req.body.username
            }}}
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message : "No thought with that ID"});
            }
        })
        .then(() => res.status(200).json({ message: "reaction added"}))
        .catch((err) => res.status(500).json(err));
    },
    // Deletes reaction
    deleteReaction (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: { reactions: req.body.reactionId }},
            { new: true }
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought with that ID "});
            }
        })
        .then(() => res.status(200).json({ message: "reaction removed" }))
        .catch((err) => res.status(500).json(err));
    }
};