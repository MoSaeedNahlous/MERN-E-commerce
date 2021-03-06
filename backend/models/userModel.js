import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isDeputy: {
        type: Boolean,
        required: true,
        default: false
    },
    balance: {
        type: Number,
        required:true,
        default : 0
    }


}, {
   timestamps:true 
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//middleware
//before save/create do this:
userSchema.pre('save', async function (next) {
    //if password field is not sent nor modified
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model('User', userSchema)

export default User