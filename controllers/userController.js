const { User } = require("../models");

const userController = {
	// gets all users with associated thoughts, and friends/friend count
	getUsers(req, res) {
		User.find()
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// gets specified user with only their associated thoughts, and friends/friend count
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.id })
			.select("-__v")
			.populate("friends")
			.populate("thoughts")
			.then((user) => {
				if (!user) {
					return res
						.status(404)
						.json({ message: "No users found with this id!" });
				} else {
					res.json(user);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// creates a new user with a specified username and a valid email
	createUser(req, res) {
		User.create(req.body)
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// updates a specified user id with a new username
	updateUser(req, res) {
		User.updateOne({ _id: req.params.id }, { username: req.body.username })
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// deletes a specified user id and any thoughts associated with it
	// will also remove them from any friends lists
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.id })
			.then((user) => {
				if (!user) {
					return res
						.status(404)
						.json({ message: "No users found with this id!" });
				} else {
					res.json(user);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// adds specified user to another user's friends list
	createFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $push: { friends: req.params.friendId } },
			{ new: true }
		)
			.populate({ path: "friends", select: "-__v" })
			.select("-__v")
			.then((user) => {
				if (!user) {
					return res
						.status(404)
						.json({ message: "No users found with this id!" });
				} else {
					res.json(user);
				}
			})
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	},

	// deletes specified user from another user's friends list
	deleteFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $pull: { friends: req.params.friendId } },
			{ new: true }
		)
			.populate({ path: "friends", select: "-__v" })
			.select("-__v")
			.then((user) => {
				if (!user) {
					return res
						.status(404)
						.json({ message: "No users found with this id!" });
				} else {
					res.json(user);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
};

module.exports = userController;
