const { Thought, User } = require("../models");

const thoughtController = {
	// get all thoughts, regardless of users
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

	// gets a single specified thought, based on thought id
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ message: "No thoughts found with this id" });
				} else {
					res.json(thought);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// creates a new thought, associated with a specific user
	createThought(req, res) {
		Thought.create(req.body)
			.then((thought) => {
				return User.findOneAndUpdate(
					{ _id: req.body.userId },
					{ $push: { thoughts: thought._id } },
					{ new: true }
				);
			})
			.then((thought) => {
				if (!thought) {
					return res.status(404).json({
						message: "No user found with this id.",
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

	// updates a user's thought with a new string
	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thought) => {
				if (!thought) {
					return res
						.status(404)
						.json({ message: "No thoughts found with this id!" });
				}
				res.json(thought);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// deletes a specified thought and removes it from it's associated user
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) => {
				if (!thought) {
					return res
						.status(404)
						.json({ message: "No thoughts found with this id" });
				} else {
					res.json(thought);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// create a reaction to a specific thought
	createReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $push: { reactions: req.body } },
			{ new: true, runValidators: true }
		)
			.populate({ path: "reactions", select: "-__v" })
			.select("-__v")
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ message: "No thoughts found with this id" });
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

	// delete specified reaction and remove it from associated thought
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ new: true }
		)
			.then((thought) => {
				if (!thought) {
					return res
						.status(404)
						.json({ message: "No thoughts found with this id" });
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
