
const jwt = require("jsonwebtoken")




const authentication = async function (req, res, next) {
    try {

        let token = req.headers.authorization
        console.log(token);
        if (!token)
            return res.status(401).send({ status: false, message: " token must be present" });

        jwt.verify(token, "intoglo", function (err, decodedtoken) {
            if (err) {
                return res.status(400).send({ status: false, message: err.message })
            }
            else {
                req.loginId = decodedtoken.userId
                console.log("end");
                next()

            }
        })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
};


module.exports={authentication}