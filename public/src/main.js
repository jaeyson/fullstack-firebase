const modalTrigger = document.querySelectorAll('.modal-trigger');

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
