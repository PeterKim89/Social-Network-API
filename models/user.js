// username - string, unique, required, trimmed
// email - string, required, unique, mongoose matching validation
// thoughts - array of _id values referencing thought model
// friends - array of _id values referencing the user model (self-reference)
// virtual 'friendCount' retrieves length of the user's friends array

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: function (data) {
					return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data);
				},
			},
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "user",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

userSchema.virtual("friendCount").get(function () {
	// return length of friend array
	return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
