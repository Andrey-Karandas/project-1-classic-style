const timer = (deadLine) => {

  const addZero = (num) => num <= 9 ? '0' + num : num

  const getTimeToDeadLine = () => {
    const total = Date.parse(deadLine) - Date.now()
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor(((total / (1000 * 60 * 60)) + 2) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    return {
      'seconds': seconds,
      'minutes': minutes,
      'hours': hours,
      'days': days,
      'total': total
    }

  }


  const setTime = () => {
    const days = document.querySelector('#days')
    const hours = document.querySelector('#hours')
    const minutes = document.querySelector('#minutes')
    const seconds = document.querySelector('#seconds')
    const timeInterval = setInterval(updateTime, 1000)
    updateTime()

    function updateTime() {
      const time = getTimeToDeadLine()
      days.textContent = addZero(time.days)
      hours.textContent = addZero(time.hours)
      minutes.textContent = addZero(time.minutes)
      seconds.textContent = addZero(time.seconds)
      if (time.total <= 0) {
        days.textContent = "00"
        hours.textContent = "00"
        minutes.textContent = "00"
        seconds.textContent = "00"
        clearInterval(timeInterval)
      }
    }
  }
  setTime()


}

export default timer