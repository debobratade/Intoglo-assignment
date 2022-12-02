
const express = require('express')
const router = express.Router()
const { authentication} = require('./middleware/authentication')
const { registerUser, userLogin, updateUserDetails } = require('./controller/userController')
const {uploadDocument, getDocumentByUserId, getDocumentById, deleteDocById, }= require('./controller/documentController')


router.post('/register',   registerUser)   
router.post('/login', userLogin)
router.put("/user/:Id", authentication,  updateUserDetails)

router.post('/upload', authentication, uploadDocument)
router.get('/getDocs/:Id', authentication, getDocumentByUserId)
router.get('/getdoc/:Id', authentication, getDocumentById)
router.delete('/deletedoc/:Id', authentication, deleteDocById)


module.exports = router