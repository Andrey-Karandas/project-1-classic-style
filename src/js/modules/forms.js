import checkNumInput from "./ckeckNumInput"
const form = (state) => {
  const forms = document.querySelectorAll('form')
  const inputs = document.querySelectorAll('input')

  checkNumInput('input[name="user_phone"]')

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо, скоро з вами звяжется менеджер',
    failure: 'Что-то пошло не так'
  }

  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      body: data
    })
    return await response.text()
  }

  function clearInput() {
    inputs.forEach(input => {
      input.value = ''
    })
  }

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      const statusMessage = document.createElement('div')
      statusMessage.classList.add('status')
      statusMessage.textContent = message.loading
      form.appendChild(statusMessage)

      const formData = new FormData(form)

      if (form.getAttribute('data-nameForm') === 'calc') {
        Object.keys(state).forEach(key => formData.append(key, state[key]))
      }


      postData('assets/server.php', formData)
        .then(() => {
          statusMessage.textContent = message.success
          Object.keys(state).forEach(key => delete state[key])
          setTimeout(() => {
            document.querySelector('.popup_calc_end').style.display = 'none'
          }, 5000)

        })
        .catch(() => {
          statusMessage.textContent = message.failure
        })
        .finally(() => {
          clearInput()
          setTimeout(() => statusMessage.remove(), 4000)
        })

    })

  })
}

export default form