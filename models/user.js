// username - string, unique, required, trimmed
// email - string, required, unique, mongoose matching validation
// thoughts - array of _id values referencing thought model
// friends - array of _id values referencing the user model (self-reference)
// virtual 'friendCount' retrieves length of the user's friends array

const {Schema, model} = require('mongoose');
const thoughtsSchema = require('./thought.js');

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
            match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, 'please add valid email']                 
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)

const User = model('user', userSchema);

module.exports = User;