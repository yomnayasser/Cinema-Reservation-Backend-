const userModel=require('../database/models/user.model')

class User{
    static Register=async(req,res)=>{
       try{
        const newUser= new userModel(req.body)
        newUser.userType="user"
        await newUser.save()
        res.status(200).send({
            apiStatus: true,
            data:newUser,
            message:"user added successfuly"
        })
       } 
       catch(e){   
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"error in register"
        })
    }
    }

    static login=async(req,res)=>{
        try{
           const user= await userModel.loginUser(req.body.email,req.body.password)
           const token = await user.generateToken()
           res.status(200).send({
            apiStatus:true,
            data:{user, token},
            message:"logged in"
        })
        }
        catch(e){   
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in register"
            })
        }
    }
}

module.exports=User