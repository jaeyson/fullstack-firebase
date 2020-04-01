const $ = x => document.querySelectorAll(x);

$('.modal-trigger').forEach(trigger => {
  trigger.addEventListener('click', e => {
    Array.from(document.getElementsByClassName("modal"))
    .forEach(modal => {
      (modal.id == `modal-${trigger.id}`)
        ? modal.classList.replace("hidden", "block")
        : modal.classList.replace("block", "hidden")
    })
  })
});

const setupUI = user => {
  user
    ? ($("logged-in").forEach(item => item.classList.replace("hidden", "block"));
       $("logged-out").forEach(item => item.classList.replace("block", "hidden")))
    : ($("logged-in").forEach(item => item.classList.replace("block", "hidden"));
       $("logged-out").forEach(item => item.classList.replace("hidden", "block")))
};

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
    })
    document.querySelector(elem).innerHTML = html
  } else document.querySelector(elem).innerHTML = "<h3>Login to view guides</h3>"
};

