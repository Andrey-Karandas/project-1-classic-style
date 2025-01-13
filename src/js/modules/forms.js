import checkNumInput from "./ckeckNumInput"
const form = () => {
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
      postData('assets/server.php', formData)
        .then(() => {
          statusMessage.textContent = message.success
        })
        .catch(() => {
          statusMessage.textContent = message.failure
        })
        .finally(() => {
          clearInput()
          setTimeout(() => statusMessage.remove(), 5000)
        })
    })

  })
}

export default form