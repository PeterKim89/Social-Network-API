const { User } = require("../models");

const userController = {
	getUsers(req, res) {
		User.find()
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then((dbUserData) => {
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	getSingleUser(req, res) {
		User.findOne({ _id: req.params.id })
			.select("-__v")
			.populate("friends")
			.populate("thoughts")
			.then((dbUserData) => {
				if (!dbUserData) {
					return res.status(404).json({ message: "No user with this id!" });
				} else {
					res.json(dbUserData);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	createUser(req, res) {
		User.create(req.body)
			.then((dbUserData) => {
				res.json(dbUserData);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},

	updateUser(req, res) {
		User.updateOne({ _id: req.params.id }, { username: req.body.username })
			.then((dbUserData) => {
				res.json(dbUserData);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	},

	deleteUser(req, res) {},

	createFriend(req, res) {},

	deleteFriend(req, res) {},
};

module.exports = userController;
