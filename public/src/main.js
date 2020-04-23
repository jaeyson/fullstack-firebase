const $all = x => document.querySelectorAll(x);
const $ = x => document.querySelector(x);
const getIdValue = (method, type) => $(`#${method}-form`)[`${method}-${type}`].value;

["toggle","remove", "add"].forEach(method => {
    Object.defineProperty(NodeList.prototype, method, {
    value: function(state) {this.forEach(item => item.classList[method](state))}
  })
})

const hideElem = method => {
  $all(`#modal-${method}`).add("hidden");
  $(`#${method}-form`).reset()
};

const setupUI = user => {
  if (user) {
    if (user.admin) $all(".admin").remove("hidden");

    accountDetails($("#account-details"), user);
    $all(".logged-in").remove("hidden");
    $all(".logged-out").add("hidden")
  } else {
    accountDetails($("#account-details"));
    $all(".logged-in, .admin").add("hidden");
    $all(".logged-out").remove("hidden")
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
      html += li
    });
    $("#guides").innerHTML = html
  } else $("#guides").innerHTML = html
};

$all("#alt-modal-login, #alt-modal-register").forEach(trigger => {
  const toggleId = (trigger.id.includes("login") && "login" || "register");

  trigger.addEventListener("click", e => {
    e.preventDefault();
    console.log(toggleId);
    $(`#${toggleId} > .nav-link`).classList.replace("text-gray-500", "text-blue-500");
    $all(`.modal-trigger:not(#${toggleId}) > .nav-link`).forEach(item => {
      item.classList.replace("text-blue-500", "text-gray-500")
    });
    $all("#modal-login, #modal-register").toggle("hidden");

  })
})
/*
*/

$all(".modal-trigger").forEach(trigger => {
  trigger.addEventListener("click", e => {
    e.preventDefault();

    $(`#${trigger.id} > .nav-link`).classList.replace("text-gray-500", "text-blue-500");
    $all(`.modal-trigger:not(#${trigger.id}) > .nav-link`).forEach(item => {
      item.classList.replace("text-blue-500", "text-gray-500")
    });

    $all(".modal").forEach(modal => {
      (modal.id === `modal-${trigger.id}`)
        ? modal.classList.remove("hidden")
        : modal.classList.add("hidden")
    })
  })
});
