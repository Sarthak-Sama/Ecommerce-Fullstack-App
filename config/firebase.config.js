const fbAdmin = require("firebase-admin");
const serviceCreds = require("/etc/secrets/ecommerce-project-backend-firebase-adminsdk-l3nye-39c337adb9.json")

fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(serviceCreds),
    storageBucket: "gs://ecommerce-project-backend.appspot.com"
});

module.exports = fbAdmin;