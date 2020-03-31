document.addEventListener("DOMContentLoaded", function() {
  const getID = x => document.getElementById(x);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const errorSwitch = err => ({
    "auth/wrong-password": "wrong password",
    "auth/invalid-email": "wrong email",
    "auth/user-disabled": "user has been disabled",
    "auth/user-not-found": "user not found",
    "auth/network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred."
  })[err]; //errorSwitch(errorCode);

  let getOrSetInput = (event, method, fn) => {
    event.preventDefault();
    const email = getID(`${method}-form`)[`${method}-email`].value;
    const password = getID(`${method}-form`)[`${method}-password`].value;

    auth.fn(email, password).then(() => {
      //.catch(error => console.log(errorSwitch(error.code)));
      getID(`modal-${method}`).classList.replace("block", "hidden");
      getID(`${method}-form`).reset();
    })
  };
  let getOptions = { source: "cache" };

  db.collection("guides").get().then(snapshot => setupGuides(".guides", snapshot.docs));

  auth.onAuthStateChanged(usr => usr ? console.log("logged in") : console.log("logged out"));

  getID("register-form")
    .addEventListener("submit", e => getOrSetInput(e, register, createUserWithEmailAndPassword));

  getID("login-form")
    .addEventListener("submit", e => getOrSetInput(e, login, signInWithEmailAndPassword));

  getID("logout")
    .addEventListener("click", e => {e.preventDefault();auth.signOut()});

});

