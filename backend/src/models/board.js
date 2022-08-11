import mongoose, {Schema} from "mongoose";

const boardSchema = new mongoose.Schema({
    title: {type: String, required: [true, "can't be blank"]},
    bg: {type: String, required: [true, "can't be blank"]},
    creator: {type: Schema.Types.ObjectId, ref: 'users', required: [true, "can't be blank"]},
    members: [{type: Schema.Types.ObjectId, ref: 'users'}]
}, {timestamps: true})

mongoose.model('board', boardSchema);
