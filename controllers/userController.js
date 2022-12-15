const { User } = require("../models");

const userController = {
	getUsers(req, res) {
		User.find()
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then((dbUsersData) => {
				res.json(dbUsersData);
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
				console.log(err);
				res.status(400).json(err);
			});
	},

	updateUser(req, res) {
		User.updateOne({ _id: req.params.id }, { username: req.body.username })
			.then((dbUserData) => {
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.id })
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

	createFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $push: { friends: req.params.friendId } },
			{ new: true }
		)
			.populate({ path: "friends", select: "-__v" })
			.select("-__v")
			.then((dbUserData) => {
				if (!dbUserData) {
					return res.status(404).json({ message: "No User with this id!" });
				} else {
					res.json(dbUserData);
				}
			})
			.catch((err) => {
				res.json(err);
			});
	},

	deleteFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $pull: { friends: req.params.friendId } },
			{ new: true }
		)
			.populate({ path: "friends", select: "-__v" })
			.select("-__v")
			.then((dbUserData) => {
				if (!dbUserData) {
					return res.status(404).json({ message: "No User with this id!" });
				} else {
					res.json(dbUserData);
				}
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
};

module.exports = userController;
