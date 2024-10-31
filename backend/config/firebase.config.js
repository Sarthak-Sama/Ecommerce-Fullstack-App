const fbAdmin = require("firebase-admin");
const serviceCreds = require("/etc/secrets/firebase.json")

fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(serviceCreds),
    storageBucket: "gs://ecommerce-app-8b8f2.appspot.com"
});

module.exports = fbAdmin;