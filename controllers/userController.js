
const { User, Thought } = require('../models');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId},
            { username: req.body.username, email: req.body.email },
            { runValidators: true, new: true }
        );
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const removeUser = async (req, res) => {
    try {
        const user = await User.deleteOne(
            {_id: req.params.userId}
        );
        res.status(200).json(user);
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const addNewFriend = async (req, res) => {
    try {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true,},
        );
        res.status(200).json(friend);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const removeFriend = async (req, res) => {
    try {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true, runValidators: true,},
        );
        res.status(200).json(friend);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
    addNewFriend,
    removeFriend,
};