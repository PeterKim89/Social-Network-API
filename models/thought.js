const { Schema, model } = require("mongoose");

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
            ref: 'user',
        },
        reactions: {},
    },
    {
        toJSON: {
            getters: true,
        }
    }
);
