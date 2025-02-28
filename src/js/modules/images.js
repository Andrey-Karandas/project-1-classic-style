import calcScroll from './calcScroll'

const images = () => {
  const popup = document.createElement('div');
  const workSection = document.querySelector('.works');
  const img = document.createElement('img');
  const widthScroll = calcScroll()

  workSection.appendChild(popup);
  popup.appendChild(img);
  popup.classList.add('popup');

  popup.style.cssText = `
    alignt-items: center;
    justify-content: center;
    padding: 15px;
    `

  workSection.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('preview')) {
      popup.style.display = 'flex';
      const path = target.parentNode.getAttribute('href');
      img.setAttribute('src', path);
      img.style.maxWidth = '100%'
      document.body.classList.add('modal-open');
      document.body.style.marginRight = `${widthScroll}px`
    }

    if (target.matches('div.popup')) {
      popup.style.display = 'none';
      document.body.classList.remove('modal-open');
      document.body.style.marginRight = `0px`

    }
  })

};

export default images;