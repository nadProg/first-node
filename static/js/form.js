(() => {
  const FORM_NAME = 'userForm';
  const MODAL_SELECTOR = '#modal';
  const MODAL_TRIGGER_SELECTOR = '[data-bs-target="#modal"]';
  const MODAL_HIDE_EVENT = 'hide.bs.modal';
  const MODAL_MESSAGE_SELECTOR = '#modal__message';
  const MODAL_BTN_SELECTOR = '#modal__btn';

  const form = document.forms[FORM_NAME];
  const modal = document.querySelector(MODAL_SELECTOR);
  const modalMessage = modal.querySelector(MODAL_MESSAGE_SELECTOR);
  const modalBtn = modal.querySelector(MODAL_BTN_SELECTOR);
  const modalTrigger = document.querySelector(MODAL_TRIGGER_SELECTOR);

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    form.submit.disabled = true;

    // eslint-disable-next-line
    axios({
      method: form.dataset.method,
      url: form.action,
      data: new FormData(form),
    })
      .then((response) => {
        console.log(response);
        modal.addEventListener(MODAL_HIDE_EVENT, () => window.location.replace('/'));
        modalMessage.textContent = `Status: ${response.status}. ${response.statusText}`;
        modalBtn.classList.add('btn-success');
        modalBtn.classList.remove('btn-danger');
      })
      .catch((err) => {
        console.dir(err);
        modalMessage.textContent = `Error: ${err.message}`;
        modalBtn.classList.add('btn-danger');
        modalBtn.classList.remove('btn-success');
      })
      .finally(() => {
        modalTrigger.click();
        form.submit.disabled = false;
      });
  };

  const onFormInput = () => {};

  form.addEventListener('submit', onFormSubmit);
  form.addEventListener('input', onFormInput);
})();
