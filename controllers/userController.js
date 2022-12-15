const { User } = require("../models");

const userController = {
	getUsers(req, res) {
		User.find()
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then((userDbData) => res.json(userDbData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	getSingleUser(req, res) {},

	createUser(req, res) {},

	updateUser(req, res) {},

	deleteUser(req, res) {},

	createFriend(req, res) {},

	deleteFriend(req, res) {},
};

module.exports = userController;
