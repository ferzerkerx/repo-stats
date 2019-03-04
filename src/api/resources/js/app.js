(global => {
  const formDom = document.getElementById('inputForm');
  const errorDom = document.getElementById('errorDiv');
  const successDom = document.getElementById('successDiv');
  const submitButtonDom = document.getElementById('submitBtn');

  const createRequest = form => {
    const orgName = form.orgName.value || null;
    const repositoryName = form.repositoryName.value || null;

    return {
      orgName,
      repositoryName
    };
  };

  const sendRequest = request => {
    const url = `/metrics/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
  };

  const handleFormSubmit = e => {
    submitButtonDom.disabled = true;
    try {
      e.preventDefault();
      const form = e.target;
      errorDom.innerText = '';
      successDom.innerText = '';
      const request = createRequest(form);
      sendRequest(request);
      successDom.innerText =
        'Your request is being processed... be advised that this can take several minutes.';

      global.setTimeout(() => {
        successDom.innerText = '';
        submitButtonDom.disabled = false;
      }, 4000);
    } catch (e) {
      errorDom.innerText = `Error: ${e.message}`;
    }
  };

  const cleanup = () => {
    global.onunload = () => {
      formDom.removeEventListener('submit', handleFormSubmit);
    };
  };

  const addEventListeners = () => {
    if (!formDom) {
      throw Error('cannot start app because inputForm is not there.');
    }
    formDom.addEventListener('submit', handleFormSubmit);
    cleanup();
  };

  const start = () => {
    addEventListeners();
  };

  start();
})(window);
