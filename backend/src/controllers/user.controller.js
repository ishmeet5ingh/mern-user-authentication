const User = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
   try {
    const { name, email, phoneNumber, userType, password } = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(409)
            .json({message: 'User already exist, you can login', success: false})
    }

    const userModel = new User({name, email, phoneNumber, userType, password})

    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    res.status(201)
        .json({
            message: "Register successfully",
            success: true
        })

   } catch (error) {
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
   }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        const errorMsg = 'Wrong email or password';
        if (!existingUser) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const token = jwt.sign(
            { email: existingUser.email, _id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(200).json({
            message: "Login successfully",
            success: true,
            name: existingUser.name,
            email,
            phoneNumber: existingUser.phoneNumber,
            userType: existingUser.userType
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};



const logoutUser = (req, res) => {
    try {
        res.cookie('token', '', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            expires: new Date(0) 
        });

        res.status(200).json({
            message: "Logout successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
