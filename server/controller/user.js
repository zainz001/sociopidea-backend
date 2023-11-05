import bcrypt from 'bcrypt.js';
import jwt from 'jsonwebtoken';

import user from '../modules/user';
export const signin = async (req,res)=>{
        const {email,password}=req.body;
        try {
            const existing =await user.findone({email});

            if(!existing) return res.status(404).json({message:"user Does not exist"}) ;

            const checkpassword= await  bcrypt.compare(password,existing.password);
            
            if(!checkpassword) return res.status(400).json({message:"invalid password"});
            
            const token=jwt.sign({email:existing.email, id:existing._id},'test',{expiresIn:"3000"});

            res.status(200).json({result:existing,token});


        } catch (error) {
            res.status(500).json({message:'500 error'});
            
        }
}


export const signup = async (req,res)=>{
    const {email,password,confirmassowrd,firstname,lastname}=req.body; 


    try {
        
        
        const existing =await user.findone({email});

        if(existing) return res.status(400).json({message:"user already exist"}) ;

        if(password !== confirmassowrd )return res.status(400).json({message:"Password not Same"}) ;

        const hashedpassword= await bcrypt.hash(password,12);
        const result=await user.create({email,password:hashedpassword,name:`${firstname} ${lastname}`})
        const token=jwt.sign({email:result.email, id:result._id},'test',{expiresIn:"3000"});
        res.status(200).json({result, token});

    } catch (error) {
 
        res.status(500).json({message:'500 error'});
                   
    }






}