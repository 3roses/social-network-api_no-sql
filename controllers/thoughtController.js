
const {Thought, User} = require('../models');

const getAllThoughts = async (req, res) => {
    try {
        const thought = await Thought.find();
        res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const createThought = async (req, res) => {
    try {
        const createdThought = await Thought.create(req.body);
        const updatedUser = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: {thoughts: createdThought} },
            { new: true },
        );
        res.status(200).json(createdThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true },
        );
        res.status(200).json(updatedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const removeThought = async (req, res) => {
    try {
        const deletedThought = await Thought.findOneAndDelete(
            {_id: req.params.thoughtId},
        );
        await User.findOneAndUpdate(
            {username: deletedThought.username},
            {$pull: {thoughts: req.params.thoughtId}},
            {new: true}
        );
        res.status(200).json(deletedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const createNewReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: req.body } },
            { new: true }
        );

        res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );

        res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    removeThought,
    createNewReaction,
    removeReaction,
};

