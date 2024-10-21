const FirebaseStorage = require("multer-firebase-storage");
const multer = require("multer");
const serviceCreds = require("/etc/secrets/ecommerce-project-backend-firebase-adminsdk-l3nye-39c337adb9.json")
const fbAdmin = require("./firebase.config")


const storage = FirebaseStorage({
    bucketName: "gs://ecommerce-project-backend.appspot.com",
    credentials: fbAdmin.credential.cert(serviceCreds),
    unique: true,
    public: true
})

const upload = multer({
    storage: storage
})

module.exports = upload
