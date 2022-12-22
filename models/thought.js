const { Schema, Types, model } = require("mongoose");

const reactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		max_length: 280,
	},
	username: {
		type: String,
		requried: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			// between 1 and 280 chars
			min_length: 1,
			max_length: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
