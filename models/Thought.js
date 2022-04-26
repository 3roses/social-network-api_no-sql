const {Schema, model} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        },
        timestamps: true
    }
);

const thoughtSchema = new Schema(
    {
        thoughtContent: {
            type: String,
            required: true,
            minlength:1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true
        },
        timestamps: true
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function(){return this.reactions.length});

    const Thought = model('thought', thoughtSchema);

    module.exports = {Thought, thoughtSchema};