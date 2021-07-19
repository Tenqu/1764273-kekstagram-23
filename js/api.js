const getData = (onFail) => fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {onFail('Не удалось загрузить страницу, проверьте интернет соединение.');
    }
  }).catch(() => {
    onFail('Что то пошло не так, повторите попытку позже.');
  });

const sendData = (onSuccess, onFail, body) => {
  fetch('https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
