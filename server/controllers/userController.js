const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const registerUser = async (req, res)=> {

    try{

        const {name, email, password} = req.body;

        if(!name || !email || !password)
        {
            return res.status(400).json({message : "All fields are required"});
        }

        const userExists = await User.findOne({email});
        if(userExists)
        {
            return res.status(400).json({message : "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const user = await User.create ({
            name,
            email,
            password : hashedpassword
        });

       res.status(201).json(
        {
            _id : user._id,
            name : user.name,
            email : user.email,
            message : "User Registered Successfully"
        }
    );


    }
    catch(error)
    {
       res.status(500).json({message :error.message });
    }
}


const loginUser = async (req, res)=> {
    try
    {
        const {email, password} = req.body;
        
        if(!email || !password)
        {
            return res.status(400).json({message : "Email and password required"});
        }

        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const passwordmatch = await bcrypt.compare(password, user.password);

        if(!passwordmatch)
        {
            return res.status(400).json({message : "Invalid password"});
        }

        const token = jwt.sign(
            {id : user.id},
            process.env.JWT_SECRET,
            {expiresIn : "1d"}

        );

        res.status(200).json(
        {
            _id : user._id,
            name : user.name,
            email : user.email,
            token
        })


    }
    catch(error)
    {
        res.status(500).json({message : error.message});
    }


}

module.exports = {registerUser, loginUser};