const User = require("../model/User");
const jwt = require('jsonwebtoken');

maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {

    return jwt.sign({id}, 'CHIKAANYA', {
        expiresIn: maxAge
    })
}


module.exports.signupGet = (req , res ) => {
    res.send('signup');
}

module.exports.loginGet = (req , res ) => {
    res.send('login')
}

module.exports.signupPost = async (req , res ) => {
    const {email , password } = req.body;
    
    try {
        const user =  await User.create({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge:maxAge * 1000});
        res.status(201).json({user, token})
    } catch (error)  {
            const validationError = error.message
            const codeError = error.code
        
            res.status(400).json({message:'User not created.',validationError:validationError, codeError })       
        
    }
}

module.exports.loginPost = async (req , res ) => {

    const { email , password } = req.body;

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id);
        res.status(200).json({user, token});

    } catch (err) {
        res.status(400).json({message: 'Unable to Login'})
    }
}
