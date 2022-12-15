const { Thought, User } = require("../models");

const thoughtController = {
	getThoughts(req, res) {
		Thought.find()
			.then((courses) => {
				res.json(courses);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	},

	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.id })
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ message: "No thought with that ID" });
				} else {
					res.json(thought);
				}
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	},

	createThought(req, res) {},

	updateThought(req, res) {},

	deleteThought(req, res) {},

	createReaction(req, res) {},

	deleteReaction(req, res) {},
};

module.exports = thoughtController;
