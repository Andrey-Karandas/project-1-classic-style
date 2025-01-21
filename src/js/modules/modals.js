const modals = (state) => {

  function checkProps(keys = []) {
    let props = []
    for (let key of keys) {
      if (!state.hasOwnProperty(key) || state[key] === '') {
        props.push(key)
      }
    }
    return props
  }

  function showModal(modals, currentModal) {
    modals.forEach((item) => item.style.display = 'none')
    currentModal.style.display = 'block'
    document.body.classList.add('modal-open')
  }

  function bindModal(triggerSelector, modalSelector, closeSelector, closeOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector)
    const modal = document.querySelector(modalSelector)
    const close = document.querySelector(closeSelector)
    const allModal = document.querySelectorAll('[data-modal]')

    trigger.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()

        if (item.classList.contains('popup_calc_button')) {
          ['#width', '#height'].forEach(item => {
            document.querySelector(item).style.border = '1px solid #ccc'
          })
          const props = checkProps(['width', 'height'])
          props.forEach(prop => {
            document.querySelector(`#${prop}`).style.border = '1px solid red'
          })
          if (props.length === 0) showModal(allModal, modal)

        } else if (item.classList.contains('popup_calc_profile_button')) {
          const props = checkProps(['type', 'profile']).map(prop => {
            return `<div style="color:red">${prop === 'type' ? "*Выбирете остекление" : "*Выберите холодное или теплое"}</div>`
          })

          document.querySelector('.info').innerHTML = props.join('')

          if (props.length === 0) showModal(allModal, modal)
        }

        if (!item.classList.contains('popup_calc_button') && !item.classList.contains('popup_calc_profile_button')) {
          showModal(allModal, modal)
        }

      })
    })

    close.addEventListener('click', () => {
      allModal.forEach((item) => item.style.display = 'none')
      modal.style.display = 'none'
      document.body.classList.remove('modal-open')
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeOverlay) {
        allModal.forEach((item) => item.style.display = 'none')
        modal.style.display = 'none'
        document.body.classList.remove('modal-open')
      }
    })
  }

  function showModalByTime(modalSelector, time) {
    setTimeout(() => {
      document.querySelector(modalSelector).style.display = 'block'
      document.body.classList.add('modal-open')
    }, time)
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close')
  bindModal('.phone_link', '.popup', '.popup .popup_close')
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false)
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false)
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false)
  // showModalByTime('.popup', 60000)
}

export default modals