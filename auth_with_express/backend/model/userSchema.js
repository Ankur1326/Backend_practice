const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'user name is Required'],
        minLength: [5, 'name must be at least 5 char'],
        maxLength: [50, 'name must be at less then 50 char'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'user email is required'],
        unique: true,
        lowercase: true,
        unique: [true, 'already regertered']
    },
    password: {
        type: String,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiryDate: {
        type: Date
    },
    // timestamps: true
})

userSchema.method = {
    jwtToken() {
        return this.jwtToken.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            { expiresIN: '24h' }
        )
    }
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;