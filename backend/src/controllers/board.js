import {size} from 'lodash';
import mongoose from "mongoose";
import {ObjectId} from "mongodb";

require('../models/user');
require('../models/board');

const Board = mongoose.model('board');
const User = mongoose.model('users');

export default {
    async create(req, res, next) {
        console.log("CREATE")
        if (!req.body.board || size(req.body.board) < 3) {
            return res.sendStatus(400);
        }
        let check = check_requiredFields(req.body.board);
        if (check !== '') {
            return res.status(422).json({errors: check});
        }
        await User.findById(req.body.board.creator).then((user) => {
            if (!user) {
                return res.status(422).json({error: {creator: "record not found"}});
            } else {
                console.log('Creating a Board . . . ');
                const board = new Board();
                board.title = req.body.board.title;
                board.bg = req.body.board.bg;
                board.creator = req.body.board.creator;
                if (req.body.board.members) board.members = req.body.board.members;

                board.save().then(() => {
                    return res.status(201).json({board});
                })
            }
        }, err => {
            return res.status(400).json({error: "creator must be a string of 12 bytes or a string of 24 hex characters or an integer"});
        }).catch(next);
    },
    delete(req, res, next) {
        console.log("DELETE");
        const id = req.params.id;
        console.log(id);
        if (!id) {
            return res.sendStatus(400);
        }
        console.log('Deleting a board');
        Board.findByIdAndDelete(id).then(msg => {
            if (msg) return res.status(200).json(id);
            else return res.sendStatus(412);
        }).catch(next);
    },
    specific(req, res, next) {
        console.log("SPECIFIC");
        const creator = req.params.creator;
        if (!creator) {
            return res.sendStatus(400);
        }
        console.log('Fetching admin boards');
        Board.find({
            $or:[
                {creator},
                {members:creator}
            ]
        }).then(boards => {
            if(boards) return res.status(200).json(boards);
            else next();
        }).catch(next);
    },
    one(req, res, next) {
        console.log("ONE");
        const id = req.params.id;
        if (!id) {
            return res.sendStatus(400);
        }
        console.log('Fetching a board');
        Board.findById(id).then(board => {
            if (!board) return res.sendStatus(412);
            else return res.status(200).json({board});
        }).catch(next);
    }, all(req, res, next) {
        console.log("ALL");
        Board.find({}).then(boards => {
            if (size(boards) !== 0) res.status(200).json(boards);
            else res.status(200).json({msg: "No board found"});
        }).catch(next);
    }, update(req, res, next) {
        console.log("UPDATE");
        const board = req.body.board;
        if (!board || !board.id || board.id === "") {
            return res.sendStatus(400);
        }
        Board.findByIdAndUpdate(board.id, {
            title: board.title,
            bg: board.bg,
            members: board.members
        }).then((updatedBoard) => {
            if (updatedBoard) return res.status(200).json(board);
            else return res.sendStatus(412);
        }).catch(next);
    }
};

const check_requiredFields = (board) => {
    if (!board.title) {
        return {title: 'can\'t be blank'};
    }
    if (!board.bg) {
        return {bg: 'can\'t be blank'};
    }
    if (!board.creator) {
        return {creator: 'can\'t be blank'};
    }
    return '';
}
