document.addEventListener("DOMContentLoaded", function() {
  const getID = x => document.getElementById(x);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const email = method => getID(`${method}-form`)[`${method}-email`].value;
  const password = method => getID(`${method}-form`)[`${method}-password`].value;
  const showErrorMessage = err => ({
    "auth/wrong-password": "wrong password",
    "auth/invalid-email": "wrong email",
    "auth/user-disabled": "user has been disabled",
    "auth/user-not-found": "user not found",
    "auth/network-request-failed": "a network error (such as timeout, interrupted connection or unreachable host) has occurred.",
    "auth/argument-error": "wrong type of args"
  })[err]; //errorSwitch(errorCode);

  const hideElem = method => {
      getID(`modal-${method}`).classList.replace("block", "hidden");
      getID(`${method}-form`).reset() };

  // getInput :: e -> String -> Function name -> what's return val of auth.fn()?
  const getInput = (event, method, fn) => {
    event.preventDefault();

    fn.then(hideElem(method))
      .catch(error => console.log(showErrorMessage(error.code)));
  };
  //const getOptions = { source: "cache" };

  auth.onAuthStateChanged(user => {
    if (user) {
      console.log(user);
      db.collection("guides").onSnapshot(snapshot => {
        setupGuides(".guides", snapshot.docs);
        setupUI(user)
      }).catch(err => console.log(err.message))
    } else { setupGuides(".guides", []); setupUI(false) }
  });

  $("#create-form").addEventListener("submit", e => {
    e.preventDefault();

    db.collection("guides")
      .add({
        title: $("#create-form")["create-title"].value,
        content: $("#create-form")["create-content"].value })
      .catch(err => console.log(err.message))
      .then(() => hideElem("create"))
  })

  getID("register-form")
    .addEventListener("submit", e => getInput(e, "register", auth.createUserWithEmailAndPassword(email("register"),password("register"))));

  getID("login-form")
    .addEventListener("submit", e => getInput(e, "login", auth.signInWithEmailAndPassword(email("login"),password("login"))));

  getID("logout")
    .addEventListener("click", e => { e.preventDefault(); auth.signOut() });
});

