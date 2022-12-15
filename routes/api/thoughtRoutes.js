const router = require("express").Router();
const {
	getThoughts,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
	createReaction,
	deleteReaction,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts);
router
	.route("/:thoughtId")
	.post(createThought)
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);
router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;