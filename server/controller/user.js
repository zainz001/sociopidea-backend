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

  

export const signup = async (req,res)=>{

    console.log(req.body);
    const { email, password, confirmpassword, firstname, lastname } = req.body;
    

    try {
        
        
        const existing =await user.findOne({email});

        if(existing) return res.status(400).json({message:"user already exist"}) ;

        if(password !== confirmpassword )return res.status(400).json({message:"Password not Same"}) ;

        const hashedpassword= await bcrypt.hash(password,12);
        const result = await user.create({ email, password: hashedpassword, name: `${firstname} ${lastname}` });
if (result) {
    // User was created successfully
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '3000' });
    res.status(200).json({ result, token });
} else {
    // Handle the case where user creation failed
    res.status(500).json({ message: 'Failed to create user' });
}


    } catch (error) {
        console.log(error);
        res.status(500).json({message:'500 error'});
                   
    }






}