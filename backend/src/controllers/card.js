import mongoose from 'mongoose';
import {size} from 'lodash';

require('../models/user');
require('../models/card');

const Card = mongoose.model('cards');
const User = mongoose.model('users');

export default {
    async create(req, res, next) {
        console.log("CREATE")
        if (!req.body.card || size(req.body.card) < 3) {
            return res.sendStatus(400);
        }
        let check = check_requiredFields(req.body.card);
        if (check !== '') {
            return res.status(422).json({errors: check});
        }
        await User.findById(req.body.card.assigner).then((user) => {
            if (!user) {
                return res.status(422).json({error: {assigner: "record not found"}});
            } else {
                console.log('Creating a Card . . . ');
                const card = new Card();
                card.title = req.body.card.title;
                card.list = req.body.card.list;
                card.assigner = req.body.card.assigner;
                if (req.body.card.description) card.description = req.body.card.description;
                if (req.body.card.dueDate) card.dueDate = req.body.card.dueDate;
                if (req.body.card.checked) card.checked = req.body.card.checked;
                if (req.body.card.status) card.status = req.body.card.status;
                if (req.body.card.assignees) card.assignees = req.body.card.assignees;

                card.save().then(() => {
                    return res.status(201).json({card});
                })
            }
        }, err => {
            return res.status(400).json({error: "assigner must be a string of 12 bytes or a string of 24 hex characters or an integer"});
        }).catch(next);
    }, delete(req, res, next) {
        console.log("DELETE");
        const id = req.params.id;
        console.log(id);
        if (!id) {
            return res.sendStatus(400);
        }
        console.log('Deleting a card');
        Card.findByIdAndDelete(id).then(msg => {
            if (msg) return res.status(200).json(id);
            else return res.sendStatus(412);
        }).catch(next);
    }, one(req, res, next) {
        console.log("ONE");
        const id = req.params.id;
        if (!id) {
            return res.sendStatus(400);
        }
        console.log('Fetching a card');
        Card.findById(id).then(card => {
            if (!card) return res.sendStatus(412);
            else return res.status(200).json({card});
        }).catch(next);
    }, all(req, res, next) {
        console.log("ALL");
        Card.find({}).then(cards => {
            if (size(cards) !== 0) res.status(200).json(cards);
            else res.status(200).json({msg: "No card found"});
        }).catch(next);
    },
    specific(req, res, next) {
        console.log("SPECIFIC");
        const user = req.params.id;
        if (!user) {
            return res.sendStatus(400);
        }
        console.log('Fetching user cards');
        Card.find({
            $or:[
                {assigner:user},
                {assignees:user}
            ]
        }).then(cards => {
            if(cards) return res.status(200).json(cards);
            else next();
        }).catch(next);
    },update(req, res, next) {
        console.log("UPDATE");
        const card = req.body.card;
        console.log(req.body);
        if (!card || !card.id || card.id === "") {
            return res.sendStatus(400);
        }
        Card.findByIdAndUpdate(card.id, {
            title: card.title,
            list: card.list,
            description: card.description,
            dueDate: card.dueDate,
            checked: card.checked,
            status: card.status,
            assignees: card.assignees
        }).then((updatedCard) => {
            if (updatedCard) return res.status(200).json(card);
            else return res.sendStatus(412);
        }).catch(next);
    }
}

const check_requiredFields = (card) => {
    if (!card.title) {
        return {title: 'can\'t be blank'};
    }
    if (!card.list) {
        return {list: 'can\'t be blank'};
    }
    if (!card.assigner) {
        return {assigner: 'can\'t be blank'};
    }
    return '';
}
