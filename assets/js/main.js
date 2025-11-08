// HTMLElement
const navLinks = document.querySelectorAll(".nav-link");
const cardsContainer = document.querySelector(".cards-container")
const searchInput = document.querySelector(".search")
//variables
let myrequest = new XMLHttpRequest();
let apiKey = 'key=56f0c39ab7f24b99be1172554250311'
// Weather API request
hundlerequst()

//functions
function hundlerequst() {
  navigator.geolocation.getCurrentPosition(getPosition);
  function getPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = `${latitude},${longitude}`;

    myrequest.open('GET', `http://api.weatherapi.com/v1/forecast.json?${apiKey}&q=${location}&days=3`)
    myrequest.send()
    myrequest.addEventListener("readystatechange", function () {
      if (this.readyState == 4) {
        result = JSON.parse(myrequest.response)
        console.log(result)
        displaycard(result)
      }
    })
  }
}
function getday(index) {
  const dateStr = result.forecast.forecastday[index].date;
  const dateObj = new Date(dateStr);

  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  return dayName;

}
function getmonth(index) {
  const dateStr = result.forecast.forecastday[index].date;
  const dateObj = new Date(dateStr)
  const month = dateObj.getDate() + " " + dateObj.toLocaleDateString("en-US", { month: "long" })
  return month;
}
function displaycard(obj) {
  row = `          <div class="col">
            <div class="card px-0 h-100">
              <div class="card-header d-flex">
                <span>${getday(0)}</span>
                <span class="ms-auto">${getmonth(0)}</span>
              </div>
              <div class="card-body py-4">
                <h5 class="city">${result.location.name}</h5>
                <p class="card-text m-0 fw-bolder display-1">${result.current.temp_c}°C</p>
                <img src=${result.forecast.forecastday[0].day.condition.icon} alt="">
                <p class="text-primary mt-4 mb-5"> ${result.forecast.forecastday[0].day.condition.text}</p>
                <div class=" d-flex gap-5">
                  <span class="small-gray">
                    <img src="./assets/images/icon-umberella.png" class="me-1">
                    20%
                  </span>
                  <span class="small-gray">
                    <img src="./assets/images/icon-wind.png" class="me-1">
                    18km/h
                  </span>
                  <span class="small-gray">
                    <img src="./assets/images/icon-compass.png" class="me-1">
                    east
                  </span>
                </div>
              </div>

            </div>
          </div>
          <div class="col">
            <div class="card text-center px-0 h-100">
              <div class="card-header">
               ${getday(1)}
              </div>
              <div class="card-body d-flex flex-column align-items-center justify-content-center">
                <img src=${result.forecast.forecastday[1].day.condition.icon} alt="">
                <p class="card-text mb-0 mt-2 fs-3 fw-bold">${result.forecast.forecastday[1].day.maxtemp_c}°C</p>
                <p class="small  mb-2  text-secondary fs-4 small-gray">${result.forecast.forecastday[1].day.mintemp_c}°</p>
                <p class="text-primary"> ${result.forecast.forecastday[1].day.condition.text}</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-center px-0 h-100">
              <div class="card-header">
                ${getday(2)}
              </div>
              <div class="card-body d-flex flex-column align-items-center justify-content-center">
                <img src=${result.forecast.forecastday[2].day.condition.icon} alt="">
                <p class="card-text mb-0 mt-2 fs-3 fw-bold">${result.forecast.forecastday[2].day.maxtemp_c}°C</p>
                <p class="small  mb-2  text-secondary fs-4 small-gray">${result.forecast.forecastday[2].day.mintemp_c}°</p>
                <p class="text-primary"> ${result.forecast.forecastday[2].day.condition.text}</p>
              </div>
            </div>
          </div>`
  cardsContainer.innerHTML = row;
}


//events
searchInput.addEventListener('input', function () {
  const newCity = searchInput.value.trim();
  if (!newCity) return;

  const request = new XMLHttpRequest();
  request.open('GET', `https://api.weatherapi.com/v1/forecast.json?${apiKey}&q=${newCity}&days=3`);
  request.send();

  request.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      result = JSON.parse(request.response);
      console.log(result);
      displaycard(result);
    }
  });
});



// Navbar active link toggle
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function () {

    // Remove 'active' class from all links
    for (let j = 0; j < navLinks.length; j++) {
      navLinks[j].classList.remove('active');
    }

    // Add 'active' to the clicked link
    this.classList.add('active');
  });
}