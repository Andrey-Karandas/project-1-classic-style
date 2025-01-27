import checkNumInput from "./ckeckNumInput"
const changeModalState = (state) => {
  const balcons = document.querySelectorAll('.balcon_icons_img')
  const balconWidth = document.querySelectorAll('#width')
  const balconHeight = document.querySelectorAll('#height')
  const balconType = document.querySelectorAll('#view_type')
  const balconProfile = document.querySelectorAll('.checkbox')

  checkNumInput('#width')
  checkNumInput('#height')

  function bindActionToElements(event, elem, prop) {
    elem.forEach((item, index) => {
      item.addEventListener(event, () => {
        switch (item.classList[0]) {
          case 'balcon_icons_img':
            state[prop] = index
            break
          case 'form-control':
            if (item.nodeName === 'INPUT' || item.nodeName === 'SELECT') {
              state[prop] = item.value
            }
            break
          case 'checkbox':
            state[prop] = item.getAttribute('data-type')
            elem.forEach(box => {
              box.checked = false
            })
            item.checked = true
            break
        }
      })
    })
  }
  bindActionToElements('click', balcons, 'form')
  bindActionToElements('input', balconWidth, 'width')
  bindActionToElements('input', balconHeight, 'height')
  bindActionToElements('change', balconType, 'type')
  bindActionToElements('change', balconProfile, 'profile')

}

export default changeModalState