import logAuth from "../model/log.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.SECRETE_KEY || ')z(~tl:qf@)3w0DbZTr6NvB67dfghjgh2344567F';


export const geh = (req, res) =>{
    res.status(201).json({success: "welcome to protected area!"});
}

export const Register = async (req, res) =>{
    const {fullname, username, email, password} = req.body;
    if(!fullname || !username || !email || !password){
        return res.status(400).json({error: "all input field are required"});
    }
    try{
        const dbUser = await logAuth.findOne({email: email});
            if(dbUser){
                return res.status(400).json({error: "user with email alrealdy exist"}); 
            }
            const hashedPswd = await bcrypt.hash(password, 20);
            const newUser = new logAuth({fullname, username, email, password: hashedPswd});
            const user = await newUser.save()
            if(user){
                return res.status(201).json({success: "registered successfully"});                     
            }
    }catch (error){
        res.status(400).json({error: error});
    }
}



export const Login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: "all input field are required"});
    }
    try{
        const dbUser = await logAuth.findOne({email: email});
        if(!dbUser){
            return res.status(400).json({error: "user does not exist"}); 
        }
        const didMatch = await bcrypt.compare(password, dbUser.password);
        if(didMatch){
            const token = jwt.sign({_id: dbUser._id}, JWT_SECRET, {expiresIn: '2h'});
            return res.status(201).json({userToken: token});
        }else { //if(!didMatch)
            return res.status(400).json({error: "invalid password"});
        }//else if(!didMatch > 2){
        //     const opt = dbUser === undefined;
        //     opt.setTimeout(() => {
        //         return res.status(400).json({error: "no more attempt"});
        //     }, 10000);
        // }
    }catch (error) {
        res.status(400).json({error});
    }
}