const documents = require('../model/documentModel')
const Tesseract = require('tesseract.js')
const pdfparse = require('pdf-parse')
const fs = require('fs')
const { uploadFile } = require("../aws/aws")
const { testAxiosXlsx } = require("../testCases/testCases")
const { validName, capitalize} = require("../testCases/testCases")

const pdf_logo= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3S56RXJWUgTbOpqWymbzuIkKGoX66pA2dA&usqp=CAU'
const excel_logo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-QuwXu5ieFHkqmDi_BTg52EQqHSFpFBlXxA&usqp=CAU'
const image_logo = 'data:image/png;base64,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'



//==============================================Upload Document==============================================//


const uploadDocument= async(req, res)=>{
try{
  
      const uploaderId = req.body.Id
     
      let title = req.body.title
      let file = req.files
      let logo; 

      if (req.loginId != uploaderId) {
        return res.status(403).send({ status: false, message: "User logged is not allowed to upload file" })
     }
   
        if (!validName(title)) {
            return res.status(400).send({ status: false, message: "Title is not in right format" })
     }
       title=capitalize(title)
        file = await uploadFile(file[0])
  

    let extension = file.split('.').pop()
    extension= extension.toLowerCase()
  
   
    if(extension=='pdf') logo=pdf_logo
    if(extension=='xlsx' || extension=='excel' || extension=='csv') logo= excel_logo
    if(extension=='png' || extension=='jpeg' ) logo= image_logo

    let data = {title, uploaderId, logo, file }
    let createUser = await documents.create(data)
   
    if(createUser)
    return res.status(201).send({ status: true, message: "User created successfully.", data: createUser })

}catch(error){
    console.log(error)
    return res.status(500).send({status:false, message:error.message})
}
}




//==============================================Get Document By User Id==============================================//

const getDocumentByUserId = async (req, res) => {
    try {
      let Id = req.params.Id;

      let files = await documents
        .find({ uploaderId: Id, isDeleted: false })
      
  
      if (!files) {
        return res.status(404).send({ status: false, message: "No documentfound" });
      }else{
      return res.status(200).send( files );
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ status: false, error: err.message });
    }
  };
  



  //==============================================Get Document By Doc. Id==============================================//


  const getDocumentById = async (req, res) => {
    try {
      let Id = req.params.Id;
      let result = ''
    
      let files = await documents
        .findOne({ _id: Id, isDeleted: false })
      
        if (req.loginId != files.uploaderId) {
          return res.status(403).send({ status: false, message: "User logged is not allowed to delete the file" })
       }

      let mfile = files.file
      let extension = mfile.split('.').pop()
      extension= extension.toLowerCase()
     

      //! PDF to text
      if(extension=='pdf'){
     await pdfparse(mfile).then(function(data){
      result=data.text 
     })
      }

      //! Image to text 
     if(extension=='jpeg' || extension== 'png'  ){
     await Tesseract.recognize(
      mfile,
      'eng',
      { logger: m => console.log(m) }
     ).then(({ data: { text } }) => {
       console.log(text);
      result=text
     })
     }
  
     //! Excel to text
     if(extension=='xlsx' || extension=='excel' || extension=='csv'){
     result = await testAxiosXlsx(mfile)
    
}
  return res.status(200).send( {status: true, result: result} );
    } catch (err) {
      console.log(err);
      return res.status(500).send({ status: false, error: err.message });
    }
  };
  



  //==============================================Delete Document==============================================//

  const deleteDocById = async function (req, res) {
    try {
        let Id = req.params.Id

        let document = await documents
        .findOne({ _id: Id, isDeleted: false })

        if (req.loginId != document.uploaderId) {
          return res.status(403).send({ status: false, message: "User logged is not allowed to delete the file" })
       }
            if (document) {
             let del = await documents.findOneAndUpdate(
              { _id: Id },
              { isDeleted: true },
              { new: true }
             );
               return res.status(200).send({status:true, message: "Your file is deleted successfully",})
            } else{
               return res.status(404).send({message : "The file already deleted"})
            }
        
    }
    catch(err){
        res.status(500).send({message : err.message})
    }
    
  }

module.exports = {uploadDocument, getDocumentByUserId, getDocumentById, deleteDocById}