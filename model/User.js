const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        unique: true,
        lowercase: true,
        validate: [ isEmail, 'Please Enter A valid email']

    },

    password : {
        type: String,
        required: [true, 'Please enter valid password'],
        minlength: [3, 'Minimum password length is 3 characters'],
       
      
    }
});

userSchema.pre('save', async function (next)  {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email , password) {
    const  user = await this.findOne({email}) 

    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user
        } 
        throw Error('Incorrect Password');   
    } 
    
    throw Error('Incorrect Email Please Try Again');
    
}

const User = mongoose.model('User', userSchema);

module.exports = User;