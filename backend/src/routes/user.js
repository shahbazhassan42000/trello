import express from 'express';
import userController from '../controllers';
import utils from '../utils';

const { Router } = express;
const { user } = userController;
const { auth } = utils;

const api = Router();
/**
 * @swagger
 * /api/user:
 *   post:
 *     tags: ["Sign in"]
 *     description: Sign in user and returns a JWT sign token
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns a JWT sign token
 *         schema:
 *           $ref: '#/definitions/JWT_signed_body'
 */
api.post('/login', user.login);

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags: ["Get all users"]
 *     description: Retrieves a list of JSON objects
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns a list of user objects
 *         schema:
 *           $ref: '#/definitions/User'
 */

// get all users
api.get('/all', auth.required,user.all);


/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     tags: ["Create a user"]
 *     description: create an object given in JSON format as in the body of the request
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "user object that needs to be added to the user list"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
 *     responses:
 *       201:
 *         description: user object created successfully.
 *       404:
 *         description: user not found against given name
 *       400:
 *         description: ERROR!!! While creating user
 */
// create user
api.post('/signup', user.signup);

/**
 * @swagger
 * /api/user/{username}:
 *   get:
 *     tags: ["Get a user by username"]
 *     description: Retrieves a JSON object against given username
 *     produces:
 *         - application/json
 *     parameters:
 *         - name: username
 *           in: path
 *           description: username of user to return
 *           required: true
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a single user matched against given username
 *         schema:
 *           $ref: "#/definitions/User"
 *       404:
 *         description: user not found against given username
 *       400:
 *         description: ERROR!!! While getting user
 */
// Get a single user against given username
api.get('/:username',auth.required, user.one);

/**
 * @swagger
 * /api/user/{username}:
 *   put:
 *       tags: ["Update a user by username"]
 *       description: 'Update an existing user'
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: username
 *           in: path
 *           description: username of user to return
 *           required: true
 *           type: string
 *         - in: body
 *           name: body
 *           description: user object that needs to be updated to the list
 *           required: true
 *           schema:
 *             $ref: '#/definitions/updatedUser'
 *       responses:
 *         '204':
 *           description: user updated successfully
 *         '404':
 *           description: user not found
 *         '400':
 *           description: ERROR!!! While updating user
 */
// update a single user against given username
api.put('/',auth.required, user.update);

/**
 * @swagger
 * /api/user/{username}:
 *   delete:
 *     tags: ["Delete a user by username"]
 *     description: Deletes a user
 *     produces:
 *         - application/json
 *     parameters:
 *         - name: username
 *           in: path
 *           description: username of user to delete
 *           required: true
 *           type: string
 *     responses:
 *         '204':
 *           description: user deleted successfully
 *         '404':
 *           description: user not found
 *         '400':
 *           description: ERROR!!! While deleting user
 */

// Delete a single user against given username
api.delete('/',auth.required, user.delete);

export default api;
