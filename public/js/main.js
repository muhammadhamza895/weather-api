const submitBtn = document.getElementById('submitBtn')
const cityName = document.getElementById('cityName')

const cityNamePlacholder = document.getElementById('cityNamePlaceholder')
const tempStatus = document.getElementById('tempStatus')
const temp = document.getElementById('temp')
const citiesDropdownList = document.getElementById('classlistDropdown')

const dataHide = document.querySelector('.dataHide')

const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthList = ['Janruary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const dates = new Date();
let dayNumber = dates.getDay();
let todayDate = dates.getDate()
const currentMonth = dates.getMonth()

document.getElementById('day').innerText = `${daysList[dayNumber]}`
document.getElementById('todayDate').innerText = `${todayDate} ${monthList[currentMonth]}`
document.addEventListener('click', () => {
  citiesDropdownList.classList.add('displayNone')
})

const citiesDropdown = () => {
  if (cityName.value !== '') {
    citiesDropdownList.classList.remove('displayNone')
    console.log(cityName.value)
    citiesDropdownList.innerHTML =
      citiesList
        .filter(function (val) {
          if (this.count < 10) {
            if (val.toLocaleLowerCase().includes(cityName.value.toLocaleLowerCase())) {
              this.count++
              return val.toLocaleLowerCase().includes(cityName.value.toLocaleLowerCase())
            }
          }
          return false
        }, { count: 0 })
        .map((val, id) => `<p class=dropDowns onclick=selectCountry(${id})>${val}</p>`)
        .toString()
        .replaceAll(',', '')
    if (document.getElementsByClassName('dropDowns').length == 0) {
      citiesDropdownList.innerHTML = `<p class=noCityFound>No city found</p>`
    }
  }
  else {
    citiesDropdownList.classList.add('displayNone')
  }
}

const selectCountry = (id) => {
  selectedDropdown = document.getElementsByClassName('dropDowns')[id].innerText
  cityName.value = ''
  getInfo(event, selectedDropdown)
  citiesDropdownList.classList.add('displayNone')
}

const getInfo = async (event, dropdownSelected) => {
  event.preventDefault()
  let cityVal = dropdownSelected || cityName.value
  if (cityVal === '') {
    cityNamePlacholder.innerText = 'Please write the name before search'
    dataHide.classList.add('dataHide')
  }
  else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=e92377dc398248fc31aa9f39901277e1&units=metric`
      let response = await fetch(url)
      const data = await response.json()
      console.log(data)
      const arrData = [data]

      cityNamePlacholder.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`
      temp.innerText = arrData[0].main.temp
      tempStatus.innerText = arrData[0].weather[0].main
      dataHide.classList.remove('dataHide')

      let tempStatusImage = arrData[0].weather[0].main
      if (tempStatusImage == 'Clear') {
        tempStatus.innerHTML = `<span class='material-symbols-outlined'>clear_day</span> ${tempStatusImage}`
      } else if (tempStatusImage == 'Fog') {
        tempStatus.innerHTML = `<span class='material-symbols-outlined'>foggy</span> ${tempStatusImage}`
      } else if (tempStatusImage == 'Rain') {
        tempStatus.innerHTML = `<span class='material-symbols-outlined'>rainy</span> ${tempStatusImage}`
      } else {
        tempStatus.innerHTML = `<span class='material-symbols-outlined'>thermostat</span> ${tempStatusImage}`
      }

    } catch (error) {
      console.log(error)
      dataHide.classList.add('dataHide')
      cityNamePlacholder.innerText = 'Sorry try again'
    }

  }
}

document.getElementById('submitBtn').addEventListener('click', getInfo)
cityName.addEventListener('keyup', citiesDropdown)


