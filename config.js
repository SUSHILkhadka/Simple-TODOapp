
const admin = require("firebase-admin");

const serviceAccount = require("./firstbackendproject-b2268-firebase-adminsdk-vigit-4fde995d95.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db=admin.firestore();
const Todo=db.collection('todocollection')
module.exports=Todo;
