const {Schema,model}=require('mongoose')
const emailvalidator = requrie('email-validator')
const bcrypt = require('bcrypt')

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
        match: [emailvalidator.validate(email),"Enter valid email"]
        
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
    }
}

const User = model('User',userSchema);

module.exports = User