const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    removeThought,
    createNewReaction,
    removeReaction,
} = require('../../controllers/thoughtController')

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(removeThought);

router.route('/:thoughtId/reactions').post(createNewReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;