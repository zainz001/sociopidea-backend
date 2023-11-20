import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secret = 'test';
import user from '../modules/user.js';

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
    console.log(req.body);
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
