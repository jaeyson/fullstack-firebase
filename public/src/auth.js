document.addEventListener("DOMContentLoaded", function() {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const functions = firebase.functions();
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
      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        console.log(user.admin);
        return setupUI(user);
      });
      db.collection("guides").onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
      }, error => console.log(error))
      console.log(user);
    } else { setupGuides([]); setupUI(false) }
  });

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

  $("#register-form").addEventListener("submit", e => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email=getIdValue("register", "email"), getIdValue("register", "password"))
      .then(cred => {
        return db.collection("users").doc(cred.user.uid).set({
          firstName: getIdValue("register", "fname"),
          lastName: getIdValue("register", "lname"),
          email: email
        });
        return cred.user.updateProfile({displayName: `${firstName} ${lastName}`});
      })
      .then(() => {
        hideElem("register");
        $("#register-form > .error").textContent = ""
      })
      .catch(error => $("#register-form > .error").textContent = error.message)
    //console.log(auth.currentUser);
    //auth.currentUser.updateProfile({displayName: `${firstName} ${lastName}`, photoURL: "#"});
    //console.log(auth.updateCurrentUser({displayName: `${firstName} ${lastName}`, photoURL: "#"}));
  });

  $("#login-form").addEventListener("submit", e => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(getIdValue("login", "email"),getIdValue("login", "password"))
      .catch(error => console.log(showErrorMessage(error.code)))
      .then(() => hideElem("login"))
  });

  $("#logout").addEventListener("click", e => {
    e.preventDefault();
    auth.signOut().then(() => {
      $all(".modal-trigger > .nav-link").forEach(item => item.classList.remove("text-gray-500"))
      $all(".modal-trigger > .nav-link").forEach(item => item.classList.add("text-blue-500"))
    })
  });

  $("#admin-form").addEventListener("submit", e => {
    e.preventDefault();

    // let mult = a => b => a * b
    // let currying = mult(2)
    // currying(4) returns 8
    // or mult(2)(4) returns 8
    /*
    functions.httpsCallable("addAdminRole")({email: $("#admin-email").value})
      .then(result => { console.log(result) })
    */
    const addAdminRole = functions.httpsCallable("addAdminRole");
    addAdminRole({ email: $("#admin-email").value })
      .then(result => { console.log(result) })
  });

});

