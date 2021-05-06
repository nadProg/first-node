(() => {
  const FORM_NAME = 'userForm';
  const form = document.forms[FORM_NAME];

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;

    form.submit.disabled = true;

    axios({
      method: form.dataset.method,
      url: form.action,
      data: new FormData(form),
    })
      .then((response) => {
        console.log(response);
        alert(`Status: ${response.status}. ${response.statusText}`);
        location.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        form.submit.disabled = false;
      });
  };

  const onFormInput = () => {};

  form.addEventListener('submit', onFormSubmit);
  form.addEventListener('input', onFormInput);
})();
