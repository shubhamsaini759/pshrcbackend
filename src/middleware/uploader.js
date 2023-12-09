const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : path.join(__dirname,"../","uploads"),
    filename(req,file,cb){
        let num = Math.round(
            Math.pow(36,10 + 1) - Math.random() * Math.pow(36,10)
        )
        .toString(36)
        .slice(null, this.filename)
        const filename = num + file.originalname.replace(/\s/g,"_")
        cb(null,filename)
    }
});

module.exports = multer({
    storage : storage,
    limits : { fileSize : 25 * 1048576 }
})