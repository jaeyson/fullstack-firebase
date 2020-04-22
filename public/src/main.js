//const getID = x => document.getElementById(x);
const $all = x => document.querySelectorAll(x);
const email = method => $(`${method}-form`)[`${method}-email`].value;
const password = method => $(`${method}-form`)[`${method}-password`].value;

Object.defineProperties(NodeList.prototype, {
  ["toggle", "add", "remove"].forEach(method => {
    return method: {
      value: function(state) {
        this.forEach(item => item.classList.toggle(state))
      }
    }
  })
})

const hideElem = method => {
  $all(`modal-${method}`).toggle("hidden");
  $(`${method}-form`).reset()
};

// getInput :: e -> String -> Function name -> what's return val of auth.fn()?
const getInput = (event, method, fn) => {
  event.preventDefault();

  fn.then(hideElem(method))
    .catch(error => console.log(showErrorMessage(error.code)));
};
//const getOptions = { source: "cache" };

const setupUI = user => {
  if (user) {
    if (user.admin) $all(".admin").remove("hidden");

    accountDetails($("account-details"), user);
    $all(".logged-in, logged-out").toggle("hidden")
  } else {
    accountDetails($("account-details"));
    $all(".logged-in, .admin").add("hidden");
    $all(".logged-out").remove("hidden");
  }
};

const accountDetails = (elem, user, html="") => {
  if (user) {
    html +=
    `<div>
      <img src=${user.photoURL || "#"} alt="Profile Pic">
      <p>${user.displayName || "someone"}</p>
      <p>Email: ${user.email}</p>
      <p class="font-bold text-white bg-purple-500 rounded">
        ${user.admin ? "Admin" : ""}
      <p>
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
        </details>
      `;
      html += li;
    });
    $("guides").innerHTML = html
  } else $("guides").innerHTML = html
};

$all(".modal-trigger").forEach(trigger => {
  trigger.addEventListener('click', e => {
    e.preventDefault();
    $all(".modal").toggle("hidden")
  })
});
