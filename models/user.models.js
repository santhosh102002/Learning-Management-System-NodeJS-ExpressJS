const {Schema,model}=require('mongoose')
const emailvalidator = require('email-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    fullname:{
        type: String,
        require:[true,"name is required"],
        minLength : [5,"Must be Aleast 5 characters"],
        maxLenght: [50,"Max 50 characters"],
        lowercase: true,
        trim : true

    },
    email:{
        type:String,
        require:[true,"email is mandatory"],
        lowercase:true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address']   
    },
    password:{
        type:String,
        require: true,
        minLength:[8,"min length of password is 8"],
        select :false
    },
    role:{
        type:String,
        enum:['ADMIN','USER'],
        default:'USER'
    },
    avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExp: Date

},{timestamps: true});
userSchema.pre('save',async ()=>{
    if(!isModified('password')){
        return next
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods = {
    comparePassword: async function(plaintext){
      return await bcrypt.compare(plaintext,this.password)
    },
    generateJWTToken: async function(){
        return await jwt.sign({id : this._id,role: this.role,email:this.email,subscription:this.subscription},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES})
    }
}

const User = model('User',userSchema);

module.exports = User