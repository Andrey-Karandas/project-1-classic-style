const images = () => {
  const imgPopup = document.createElement('div')
  const bigImg = document.createElement('img')
  const workSection = document.querySelector('.works')
  imgPopup.classList.add('popup')
  workSection.appendChild(imgPopup)
  imgPopup.appendChild(bigImg)

  workSection.addEventListener('click', (e) => {
    e.preventDefault()
    const target = e.target
    if (target.classList.contains('preview')) {
      const path = target.parentNode.getAttribute('href')
      bigImg.setAttribute('src', path)
      imgPopup.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 10px;
      `
      bigImg.style.maxWidth = '100%'
    }
    if (target.matches('div.popup')) {
      imgPopup.style.display = 'none'
    }
  })
}

export default images