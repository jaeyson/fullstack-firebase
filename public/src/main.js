document.querySelectorAll('.modal-trigger').forEach(trigger => {
  trigger.addEventListener('click', e => {
    Array.from(document.getElementsByClassName("modal"))
    .forEach(modal => {
      (modal.id == `modal-${trigger.id}`)
        ? modal.classList.replace("hidden", "block")
        : modal.classList.replace("block", "hidden")
    })
  })
})

const setupGuides = (elem, data, html="") => {
  data.forEach(doc => {
    const li = `
      <details>
        <summary>${doc.data().title}</summary>
        <p>${doc.data().content}</p>
      </details>`;
    html += li;
  })
  document.querySelector(elem).innerHTML = html;
};

