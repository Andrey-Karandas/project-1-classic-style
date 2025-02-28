import calcScroll from "./calcScroll"
const modals = (state) => {

  function bindModal(triggersSelector, modalSelector, closeSelector, closeOverlay = true, validation = false, props = []) {
    const triggers = document.querySelectorAll(triggersSelector)
    const modal = document.querySelector(modalSelector)
    const close = document.querySelector(closeSelector)
    const allModal = document.querySelectorAll('[data-modal]')
    const widthScroll = calcScroll()

    triggers.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()

        if (validation) {
          const statusMessage = item.previousElementSibling
          statusMessage.innerHTML = ''

          const message = {
            form: '*Выберете форму балкона',
            width: '*Укажите ширину',
            height: '*Укажите высоту',
            type: '*Выбирете остекление',
            profile: '*Выберите холодное или теплое',
          }

          const missingProps = props.filter(item => !state.hasOwnProperty(item) || state[item] === '')

          missingProps.forEach(prop => {
            switch (prop) {
              case 'form': statusMessage.insertAdjacentHTML('beforeend', `<p>${message.form}</p>`)
                break;
              case 'width': statusMessage.insertAdjacentHTML('beforeend', `<p>${message.width}</p>`);
                break;
              case 'height': statusMessage.insertAdjacentHTML('beforeend', `<p>${message.height}</p>`);
                break;
              case 'type': statusMessage.insertAdjacentHTML('beforeend', `<p>${message.type}</p>`)
                break;
              case 'profile': statusMessage.insertAdjacentHTML('beforeend', `<p>${message.profile}</p>`)
                break;
            }

          })

          if (missingProps.length === 0) {
            document.body.style.marginRight = `${widthScroll}px`
            allModal.forEach((item) => item.style.display = 'none')
            modal.style.display = 'block'
            document.body.classList.add('modal-open')
          }

        } else {
          document.body.style.marginRight = `${widthScroll}px`
          allModal.forEach((item) => item.style.display = 'none')
          modal.style.display = 'block'
          document.body.classList.add('modal-open')
        }
      })
    })

    close.addEventListener('click', () => {
      allModal.forEach((item) => item.style.display = 'none')
      modal.style.display = 'none'
      document.body.classList.remove('modal-open')
      document.body.style.marginRight = `0px`
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeOverlay) {
        allModal.forEach((item) => item.style.display = 'none')
        modal.style.display = 'none'
        document.body.classList.remove('modal-open')
        document.body.style.marginRight = `0px`
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
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, true, ['form', 'width', 'height'])
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false, true, ['type', 'profile'])
  // showModalByTime('.popup', 60000)
}

export default modals