const FirebaseStorage = require("multer-firebase-storage");
const multer = require("multer");
const serviceCreds = require("../etc/secrets/firebase.json")
const fbAdmin = require("./firebase.config")


const storage = FirebaseStorage({
    bucketName: "gs://ecommerce-app-8b8f2.appspot.com",
    credentials: fbAdmin.credential.cert(serviceCreds),
    unique: true,
    public: true
})

const upload = multer({
    storage: storage
})

module.exports = upload
