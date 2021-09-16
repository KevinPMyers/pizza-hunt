const { Schema, model, Types } = require('mongoose');
const { Pizza } = require('.');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        replyBody: {
            type: String,
            required: 'You must fill out your reply!',
            trim: true
        },
        writtenBy: {
            type: String,
            required: 'You need to let everyone know who wrote the reply!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);
const CommentSchema = new Schema({
    writtenBy: {
        type: String,
        required: 'You need to let everyone know who wrote this!',
        trim: true
    },
    commentBody: {
        type: String,
        required: 'You must fill in your comment!',

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);



module.exports = Comment;