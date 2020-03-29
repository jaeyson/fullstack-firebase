document.addEventListener("DOMContentLoaded", function() {
  const getID = x => document.getElementById(x);
  const auth = firebase.auth();
  const db = firebase.firestore();

  getID("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm["register-email"].value;
    const password = signupForm["register-password"].value;

    auth.createUserWithEmailAndPassword(email, password)
      .then({
        getID("modal-register").classList.replace("block", "hidden");
        signupForm.reset();
      });
  });

  getID("logout").addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(console.log("logged out"));
  });
});

