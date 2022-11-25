const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        // between 1 and 280 chars
        min_length: 1,
        max_length: 280,
    },
    createdAt: {

    },
    username: {

    },
    reactions: {

    }
})