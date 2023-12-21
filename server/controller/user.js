
import user from '../modules/user.js';
 // This file contains functions that abstract away the details of interacting with the user database.
// getUserByEmail: Retrieves a user from the database based on the provided email.
// createUser: Creates a new user in the database with the provided information.

export const getUserByEmail = async (email) => {
    return await user.findOne({ email });
};

export const createUser = async ({ email, password, name }) => {
    return await user.create({ email, password, name });
};

//This separates the database operations into a repository (user-repository.js),
// making your authentication logic more modular and easier to maintain.

//  The repository pattern abstracts away the database operations, promoting better code organization and maintainability.


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secret = 'test';


export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await user.findOne({ email });

        if (!oldUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};



export const signup = async (req, res) => {
    
    const { email, password, confirmpassword, firstname, lastname } = req.body;

    try {
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please sign in." });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password and confirm password do not match" });
        }

        const hashedpassword = await bcrypt.hash(password, 12);
        const result = await user.create({ email, password: hashedpassword, name: `${firstname} ${lastname}` });

        if (result) {
            const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '3000' });
            res.status(200).json({ result, token });
        } else {
            res.status(500).json({ message: 'Failed to create user' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: '500 error' });
    }
};
//The repository pattern is a design pattern that isolates the data layer from the rest of the app.
// The data layer refers to the part of your app, separate from the UI,
// that handles the app's data and business logic,
//exposing consistent APIs for the rest of your app to access this data