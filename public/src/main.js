const $all = x => document.querySelectorAll(x);
const $ = x => document.querySelector(x);

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

const setupUI = user => {
  if (user) {
    accountDetails($(".account-details"), `<div>Logged in as ${user.email}</div>`);
    $all(".logged-in").forEach(item => item.classList.replace("hidden", "block"));
    $all(".logged-out").forEach(item => item.classList.replace("block", "hidden"));
  } else {
    accountDetails($(".account-details"));
    $all(".logged-in").forEach(item => item.classList.replace("block", "hidden"));
    $all(".logged-out").forEach(item => item.classList.replace("hidden", "block"));
  }
};

const accountDetails = (elem, html="") => elem.innerHTML = html;

// setupGuides :: String -> HTMLCollection -> String -> String
const setupGuides = (elem, data, html="") => {
  if (data.length) {
    data.forEach(doc => {
      const li = `
        <details>
          <summary>${doc.data().title}</summary>
          <p>${doc.data().content}</p>
        </details>`;
      html += li;
    });
    $(elem).innerHTML = html
  } else $(elem).innerHTML = "<h3>Login to view guides</h3>"
};

