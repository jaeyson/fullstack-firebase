const getID = x => document.getElementById(x);
const $all = x => document.querySelectorAll(x);
const $ = x => document.querySelector(x);
const email = method => getID(`${method}-form`)[`${method}-email`].value;
const password = method => getID(`${method}-form`)[`${method}-password`].value;

$all(".modal-trigger").forEach(trigger => {
  trigger.addEventListener('click', e => {
    e.preventDefault();

    Array.from(document.getElementsByClassName("modal"))
      .forEach(modal => {
      (modal.id == `modal-${trigger.id}`)
        ? modal.classList.replace("hidden", "block")
        : modal.classList.replace("block", "hidden")
    })
  })
});

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

const setupUI = user => {
  if (user) {
    accountDetails($("#account-details"), user);
    $all(".logged-in").forEach(item => item.classList.replace("hidden", "block"));
    $all(".logged-out").forEach(item => item.classList.replace("block", "hidden"));
  } else {
    accountDetails($("#account-details"));
    $all(".logged-in").forEach(item => item.classList.replace("block", "hidden"));
    $all(".logged-out").forEach(item => item.classList.replace("hidden", "block"));
  }
};

//const accountDetails = (elem, html="") => elem.innerHTML = html;
const accountDetails = (elem, user="", html="") => {
  if (user != "") {
    html +=
    `<div>
      <img src=${user.photoURL || "#"} alt="Profile Pic">
      <p>${user.displayName || "someone"}</p>
      <p>Email: ${user.email}</p>
    </div>`; elem.innerHTML = html
  } else elem.innerHTML = html
};

// setupGuides :: String -> HTMLCollection -> String -> String
const setupGuides = (data, html="") => {
  if (data.length) {
    data.forEach(doc => {
      const li = `
        <details>
          <summary>${doc.data().title}</summary>
          <p>${doc.data().content}</p>
        </details>`;
      html += li;
    });
    $(".guides").innerHTML = html
  } else $(".guides").innerHTML = html
};

