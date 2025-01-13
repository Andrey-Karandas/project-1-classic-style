const tabs = (wrapperTabsSelector, tabSelector, contentSelector, activeClass, type = 'block') => {
  const wrapperTabs = document.querySelector(wrapperTabsSelector)
  const tab = document.querySelectorAll(tabSelector)
  const contents = document.querySelectorAll(contentSelector)

  function hideTabContent() {
    contents.forEach(item => {
      item.style.display = 'none'
    })
    tab.forEach(item => {
      item.classList.remove(activeClass)
    })
  }

  function showTabContent(index = 0) {
    contents[index].style.display = type
    tab[index].classList.add(activeClass)
  }

  hideTabContent()
  showTabContent()

  wrapperTabs.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains(tabSelector.replace(/\./, "")) ||
      target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) {
      tab.forEach((item, index) => {
        if (target == item || target.parentNode == item) {
          hideTabContent()
          showTabContent(index)
        }
      })
    }
  })

}

export default tabs