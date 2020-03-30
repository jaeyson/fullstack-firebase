document.addEventListener("DOMContentLoaded", function() {
  const getID = x => document.getElementById(x);
  //const auth = firebase.auth();
  //const db = firebase.firestore();
  const errorSwitch = err => ({
    "auth/wrong-password": "wrong password",
    "auth/invalid-email": "wrong email",
    "auth/user-disabled": "user has been disabled",
    "auth/user-not-found": "user not found",
    "auth/network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred."
  })[err]; //errorSwitch(errorCode);
  //const getOptions = { source: "cache" };

  firebase.firestore().collection("guides").get().then(snapshot => setupGuides(snapshot.docs));

  firebase.auth().onAuthStateChanged(user => user ? console.log("logged in") : console.log("logged out"));

  getID("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = getID("register-form")["register-email"].value;
    const password = getID("register-form")["register-password"].value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        getID("modal-register").classList.replace("block", "hidden");
        getID("register-form").reset();
      });
  });

  getID("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = getID("login-form")["login-email"].value;
    const password = getID("login-form")["login-password"].value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      //.catch(error => console.log(errorSwitch(error.code)));
      .then(() => {
        getID("modal-login").classList.replace("block", "hidden");
        getID("login-form").reset();
      })
  });

  getID("logout").addEventListener("click", (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });

});

