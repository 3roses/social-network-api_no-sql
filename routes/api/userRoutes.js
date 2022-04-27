const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
    addNewFriend,
    removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(removeUser);

router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeFriend);

module.exports = router;