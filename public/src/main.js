const modalTrigger = document.querySelectorAll('.modal-trigger');
const guideList = document.querySelector(".guides");

const setupGuides = data => {
  let html = "";
  data.forEach(doc => {
    const guide = doc.data();
    const li = `
      <details>
        <summary>${guide.title}</summary>
        <p>${guide.content}</p>
      </details>
    `;
    html += li;
  })

  guideList.innerHTML = html;
};

//modal
modalTrigger.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    //const modal = document.querySelector(`#modal-${trigger.id}`);
    const modals = document.getElementsByClassName('modal');
    Array.from(modals).forEach(modal => {
      (modal.id == `modal-${trigger.id}`)
        ? modal.classList.replace("hidden", "block")
        : modal.classList.replace("block", "hidden")
    })
  })
})
