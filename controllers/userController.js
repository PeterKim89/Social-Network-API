const { User } = require("../models");

const userController = {
	getUsers(req, res) {
		User.find()
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then((userDbData) => {
				res.json(userDbData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select("-__v")
			.populate("friends")
			.populate("thoughts")
			.then((userDbData) => {
				if (!userDbData) {
					return res.status(404).json({ message: "No user with this id!" });
				} else {
					res.json(userDbData);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	createUser(req, res) {
		User.create(req.body)
			.then((userDbData) => {
				res.json(userDbData);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},

	updateUser(req, res) {},

	deleteUser(req, res) {},

	createFriend(req, res) {},

	deleteFriend(req, res) {},
};

module.exports = userController;
