const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { uploadFile } = require("../aws/aws")
const { isValid, validName, isValidMail,
    isValidMobile, isValidRequest,
    isValidPassword, capitalize } = require("../testCases/testCases")



//==============================================register user==============================================//


const registerUser = async function (req, res) {
    try {
       

        let userDetails = req.body
        let files = req.files
       
        let { fname, lname, email, phone, password } = userDetails


        if (!isValidRequest(userDetails)) {
            return res.status(400).send({ status: false, message: "Please enter details for user registration." })
        }
        if (!isValid(fname)) {
            return res.status(400).send({ status: false, message: "Please enter fname for registration." })
        }
        if (!validName(fname)) {
            return res.status(400).send({ status: false, message: `${fname} is not a valid fname.` })
        }
        if (!isValid(lname)) {
            return res.status(400).send({ status: false, message: "Please enter lname for registration." })
        }
        if (!validName(lname)) {
            return res.status(400).send({ status: false, message: `${lname} is not a valid lname.` })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "Please enter a strong password for registration." })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please enter email for registration." })
        }
        if (!isValidMail(email)) {
            return res.status(400).send({ status: false, message: "Please enter a valid email address." })
        }
        let mailCheck = await userModel.findOne({ email })
        if (mailCheck) {
            return res.status(400).send({ status: false, message: `${email} already registered, try new.` })
        }
        if (files.length == 0) {
            return res.status(400).send({ status: false, message: "Please upload profile image for registration." })
        }  
        
        if (!phone) {
            return res.status(400).send({ status: false, message: "Please enter phone number for registration" })
        }
        if (!isValidMobile(phone)) {
            return res.status(400).send({ status: false, message: "Please enter a valid Indian number." })
        }
        let phoneCheck = await userModel.findOne({ phone })
        if (phoneCheck) {
            return res.status(400).send({ status: false, message: `${phone} already registered, try new.` })
        }
       
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Please enter a password which contains min 8 and maximum 15 letters." })
        }
        
        //! Bcrypt & Salt 

        if (password) {
            const salt = await bcrypt.genSalt(10)
            const newPassword = await bcrypt.hash(password, salt)
            password = newPassword
        }

       //! Upload image on AWS s3 

        var uploadedFileURL = await uploadFile(files[0])
        let profileImage = uploadedFileURL
        if (!profileImage) {
            return res.status(400).send({ status: false, message: "Kindly upload profile image" });
        }


        fname = capitalize(fname)
        lname = capitalize(lname)
        let responseBody = { fname, lname, email, phone, password, profileImage }
        let createUser = await userModel.create(responseBody)
        return res.status(201).send({ status: true, message: "User created successfully.", data: createUser })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
};




//================================================userlogin================================================//


const userLogin = async (req,res)=> {
    try {
          let {email,password} = req.body
          if(!email && !password) return res.status(400).send({
            status:false,
            message:" Kindly enter your credential "
         });
         if(!email)  return res.status(400).send({
            status:false,
            message:"  Email is Required "
         });
         if(!password) return res.status(400).send({
            status:false,
            message: " Password is Required "
         })

        const loginUser = await userModel.findOne({ email: email })
        if (!loginUser) {
            return res.status(401).send({ status: false, message: "Not register email-id" })
        }

        let hashedpass = loginUser.password  
        const validpass = await bcrypt.compare(password, hashedpass)
        if (!validpass) {
            return res.status(401).send({ status: false, message: "Incorrect Password" })
        }

        //! Create JWT token

        let token = jwt.sign(
            {
                userId: loginUser._id,
                iat: Math.floor(Date.now() / 1000),
            }, "intoglo", { expiresIn: '10h' }
        )
        let user = loginUser
        return res.status(200).send({
            status:true, user, 
            message:"User Loggedin Successfully",
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({status:false, message:error.message})
    }
};




//================================================ Update User================================================//


const updateUserDetails = async (req, res) => {
    try {
        let userId = req.params.Id

        //!checking Authorization

        if (req.loginId != userId) {
            return res.status(403).send({ status: false, message: "User logged is not allowed to update the profile details" })
        }


        const findUserData = await userModel.findById(userId)
        if (!findUserData) {
            return res.status(404).send({ status: false, message: "user not found" })
        }

        let data = req.body
        

        if ((Object.keys(data).length == 0) && (req.files===[])) {
            return res.status(400).send({ status: false, msg: "Invalid request" });
        }

        let { fname, lname, email, phone, password } = data

        let obj = {}

        if (fname) {
            if (!validName(fname)) {
                return res.status(400).send({ status: false, message: "first name is not in right format" })
            }
            obj.fname = fname
        }

        if (lname) {
            if (!validName(lname)) {
                return res.status(400).send({ status: false, message: "Last name is not in right format" })
            }
            obj.lname = lname
        }

        if (email) {
            if (!isValidMail(email)) {
                return res.status(400).send({ status: false, message: "Email not in right format" })
            }

            const checkEmailFromDb = await userModel.findOne({ _id: userId })

           
            if (checkEmailFromDb._id!=userId && checkEmailFromDb != null)
                return res.status(400).send({ status: false, message: "Email-Id Exists. Please try another email Id." })
            obj.email = email
        }

        if (phone) {
            if (!isValidMobile(phone)) {
                return res.status(400).send({
                    status: false, message: "Invalid phone number",
                });
            }

            const checkPhoneFromDb = await userModel.findOne({ _id: userId  })

            if (checkPhoneFromDb._id!=userId && checkPhoneFromDb != null) {
                return res.status(400).send({ status: false, message: " Phone number is already in use, Please try a new phone number." })
            }
            obj.phone = phone
        }

        if (password) {

            if (!isValidPassword(password)) {
                return res.status(400).send({ status: false, message: "Password not in right format. Must be 8 to 15 charactes with alphabet and numerical elements" })
            }
            const salt = await bcrypt.genSalt(10)
            const newPassword = await bcrypt.hash(password, salt)
            obj.password = newPassword
            obj.password = password

        }

       
        file = req.files
       
        if (file.length>0) {

            const userImage = await uploadFile(file[0])
            obj.profileImage = userImage

        }


        let updateProfileDetails = await userModel.findOneAndUpdate({ _id: userId }, { $set: obj }, { new: true }).select("-password")

        return res.status(200).send({ status: true, message: "Update user profile is successful", data: updateProfileDetails })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, error: err.message })
    }
};





module.exports={registerUser, userLogin, updateUserDetails}