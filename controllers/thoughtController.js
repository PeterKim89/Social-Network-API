const { Thought, User } = require("../models");

const thoughtController = {
	getThoughts(req, res) {
		Thought.find()
			.then((thought) => {
				res.json(thought);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ message: "No thought with this id" });
				} else {
					res.json(thought);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	createThought(req, res) {
		Thought.create(req.body)
			.then((thought) => {
				return User.findOneAndUpdate(
					{ _id: req.body.thoughtId },
					{ $push: { thoughts: thought._id } },
					{ new: true }
				);
			})
			.then((thought) => {
				if (!thought) {
					return res.status(404).json({
						message: "Thought created, but no user found with this id!",
					});
				} else {
					res.json({ message: "Successfully created thought!" });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thought) => {
				if (!thought) {
					return res.status(404).json({ message: "No thoughts with this id!" });
				}
				res.json(thought);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) => {
				if (!thought) {
					return res.status(404).json({ message: "No thoughts with this id!" });
				} else {
					res.json(thought);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	createReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.populate({ path: "reactions", select: "-__v" })
			.select("-__v")
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ message: "No thoughts with this id!" });
					return;
				} else {
					res.json(thought);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ new: true }
		)
			.then((thought) => {
				if (!thought) {
					return res.status(404).json({ message: "No thoughts with this id!" });
				} else {
					res.json(thought);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
};

module.exports = thoughtController;
