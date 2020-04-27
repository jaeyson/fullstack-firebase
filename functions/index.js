const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) return "error: only admins can add";
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {admin: true})
  }).then(() => {
    return {message: `Success! ${data.email} has been made admin`}
  }).catch(error => console.log(error))
})