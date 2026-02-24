//imports 
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


//user -click signup- which trigger a request to our end points
// to api/auth/signup - the we will creat e a user in database- then we will generate jwt
// we will send this back to user in cookies- and we will take user to homepage - with success message
export const signup = async (req, res) => {
  const { email, fullName, password } = req.body
  try {
    if (password.length < 6) //1.chek password length
    {
      res.status(400).json({ message: "Password must be at least 6 character" })
    }
    const user = await User.findOne({ email })//2.check user exists  with email
    if (user) return res.status(400).json({ message: "Email already exists" })

    //3.hash the password
    const salt = await bcrypt.genSalt(10) // generate salt -if 2 user have same password were stored differntly
    const hashedPassword = await bcrypt.hash(password, salt)

    //4.create new user
    const newuser= new User({
      fullName,
      email,
      password:hashedPassword
    })

    if(newUser){

    
    }else{
      
    }

  }catch(error){



}}


//user -click login- which trigger a request to our end points
// to api/auth/login - the we will check for credential (username , password) in our database (correct or not)- then we will generate jwt
// we will send this back to user in cookies- and we will take them to homepage - with success message


export const login = (req, res) => {
  res.send("login route")
}

export const logout = (req, res) => {
  res.send("logout route")
}



//while user want to  send message - 1st we will chek user has the token in the cookies -then will check token is valid or expired 
// if it is valid- allow to send the message else throw error