const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        // between 1 and 280 chars
    },
    createdAt: {

    },
    username: {

    },
    reactions: {
        
    }
})