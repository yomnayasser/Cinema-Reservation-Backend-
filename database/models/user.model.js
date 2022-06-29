const mongoose = require("mongoose");
const bcryptjs=require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema=mongoose.Schema({

    name:{
        type:String,
        require:true,
        trim:true
    },
    age:{
        type:Number,
        require:true,
        // trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required: true,
        trim:true,
        //match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    },
    userType:{
        type:String,
        trim:true,
        require:true
    },
    tokens:[
        {
            token:{
                type:String,
                required: true
            }
        }
    ]
   
})

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.__v;
    delete user.password;
    delete user.tokens
    return user;
  };
  userSchema.pre("save", async function(){
    const user = this
    if(user.isModified("password"))
        user.password = await bcryptjs.hash(user.password, 12)
})
userSchema.statics.loginUser = async(email, password)=>{
    const userData = await User.findOne({ email })
    if(!userData) throw new Error("invalid email")
    const isValidPassword = await bcryptjs.compare(password, userData.password)
    if(!isValidPassword) throw new Error("invalid Password")
    return userData
}

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token : token})
    await user.save()
    return token
}
  const User=mongoose.model("User",userSchema)

  module.exports=User