import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import generateToken from '../utils/generateToken.js'

//POST /api/users/auth
//public, authenticate user
const authUser = asyncHandler(async (req,res) => {
    const { email , password } = req.body;
    
    const user = await User.findOne({email});

    if (user && await(user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    res.status(200).json({message:'Auth User'});
});

//POST, api/users
const registerUser = asyncHandler(async (req,res) => {
    const { name, password, email } = req.body;
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error('user already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

    console.log();
    res.status(200).json({message:'Register User'});
});

//POST, api/users/logout
//private, need a jwtoken for it
const logoutUser = asyncHandler(async (req,res) => {
    res.cookie('jwt', '', {
        httpOnly:true,
        expires: new Date(0)
    });
    
    res.status(200).json({message:'User logged out'});
});

//POST, api/users/profile
//private, need a jwtoken for it
const getUserProfile = asyncHandler(async (req,res) => {
    res.status(200).json({message:'User profile'});
});

//POST, api/users/profile
//private, need a jwtoken for it
const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password){
            user.password = req.body.password
        }
        
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    } else {
        res.status(400);
        throw new Error('user not found!');
    }
    res.status(200).json({message:'User profile updated'});
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};