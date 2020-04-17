document.addEventListener("DOMContentLoaded", function() {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const showErrorMessage = error => ({
    "auth/wrong-password": "wrong password",
    "auth/invalid-email": "wrong email",
    "auth/user-disabled": "user has been disabled",
    "auth/user-not-found": "user not found",
    "auth/network-request-failed": "a network error (such as timeout, interrupted connection or unreachable host) has occurred.",
    "auth/email-already-in-use": "email address already in use",
    "auth/argument-error": "wrong type of args"
  })[error]; //showErrorMessage(error.code)

  auth.onAuthStateChanged(user => {
    if (user) {
      db.collection("guides").onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
        setupUI(user)
      }, error => console.log(error))
    } else { setupGuides([]); setupUI(false) }
  })

  $("#create-form").addEventListener("submit", e => {
    e.preventDefault();

    db.collection("guides").add({
        title: $("#create-form")["create-title"].value,
        content: $("#create-form")["create-content"].value })
      .catch(error => console.log(showErrorMessage(error.code)))
      .then(() => hideElem("create"))
  });

  /*
  getID("update-form").addEventListener("submit", e => {
    e.preventDefault();
    const firstName = getID("update-form")["update-fname"].value;
    const lastName = getID("update-form")["update-lname"].value;

    auth.currentUser.updateProfile({displayName: `${firstName} ${lastName}`, photoURL: "#"});
    auth.currentUser.updateEmail(email("update"));
  });
  */

  getID("register-form").addEventListener("submit", e => {
    e.preventDefault();
    const firstName = getID("register-form")["register-fname"].value;
    const lastName = getID("register-form")["register-lname"].value;

    auth.createUserWithEmailAndPassword(email("register"), password("register"))
      .then(cred => {
        return db.collection("users").doc(cred.user.uid).set({
          firstName: firstName,
          lastName: lastName,
          email: email("register") });
        return cred.user.updateProfile({displayName: `${firstName} ${lastName}`});
      })
      .then(() => hideElem("register"));
    //console.log(auth.currentUser);
    //auth.currentUser.updateProfile({displayName: `${firstName} ${lastName}`, photoURL: "#"});
    //console.log(auth.updateCurrentUser({displayName: `${firstName} ${lastName}`, photoURL: "#"}));
  });

  getID("login-form").addEventListener("submit", e => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email("login"),password("login"))
      .catch(error => console.log(showErrorMessage(error.code)))
      .then(() => hideElem("login"))
  });

  getID("logout").addEventListener("click", e => {
    e.preventDefault();
    auth.signOut().then(() => console.log("logged out"))
  });
});

