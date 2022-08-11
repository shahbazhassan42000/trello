import mongoose, {Schema} from 'mongoose';

export const dateToStr = (today) => {
    return ('00' + (today.getDate())).slice(-2) + '/' + ('00' + (today.getMonth() + 1)).slice(-2) + '/' + today.getFullYear();
}

const cardSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'can\'t be blank']},
    list: {type: String, required: [true, 'can\'t be blank']},
    description: {type: String, default: ""},
    dueDate: {type: String, default: dateToStr(new Date())},
    checked: {type: Boolean, default: false},
    status: {type: String, default: "due soon"},
    assigner: {type: Schema.Types.ObjectId, ref: "users", required: [true, "can't be blank"]},
    assignees: [{type: Schema.Types.ObjectId, ref: 'users'}]
}, {timestamps: true});

mongoose.model('cards', cardSchema);
