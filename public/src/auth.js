document.addEventListener("DOMContentLoaded", function() {
  const getID = x => document.getElementById(x);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const showErrorMessage = err => ({
    "auth/wrong-password": "wrong password",
    "auth/invalid-email": "wrong email",
    "auth/user-disabled": "user has been disabled",
    "auth/user-not-found": "user not found",
    "auth/network-request-failed": "a network error (such as timeout, interrupted connection or unreachable host) has occurred."
  })[err]; //errorSwitch(errorCode);

  // getInput :: e -> String -> Function name -> what's return val of auth.fn()?
  const getInput = (event, method, fn) => {
    event.preventDefault();
    const email = getID(`${method}-form`)[`${method}-email`].value;
    const password = getID(`${method}-form`)[`${method}-password`].value;

    auth.fn(email, password).then(() => {
      //.catch(error => console.log(showErrorMessage(error.code)));
      getID(`modal-${method}`).classList.replace("block", "hidden");
      getID(`${method}-form`).reset();
    })
  };
  //const getOptions = { source: "cache" };

  auth.onAuthStateChanged(usr => {
    user
      ? db.collection("guides")
          .get()
          .then(content => {setupGuides(".guides", content.docs); setupUI(user)})
      : {setupGuides([]); setupUI()}
  });

  getID("register-form")
    .addEventListener("submit", e => getInput(e, "register", createUserWithEmailAndPassword));

  getID("login-form")
    .addEventListener("submit", e => getInput(e, "login", signInWithEmailAndPassword));

  getID("logout")
    .addEventListener("click", e => {e.preventDefault();auth.signOut()});

});

