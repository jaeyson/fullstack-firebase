document.addEventListener('DOMContentLoaded', function() {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const signupForm = document.querySelector('#signup-form');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['register-email'].value;
    const password = signupForm['register-password'].value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        signupForm.reset();
        document.getElementById('modal-register')
          .classList.replace("block", "hidden");
      })
  })
})
