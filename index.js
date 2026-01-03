// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();
  clearUI();

  if (!/^[A-Z]{2}$/.test(state)) {
    showError("Please enter a valid two-letter state code.");
    return;
  }

  fetchWeatherAlerts(state);
});

function fetchWeatherAlerts(state) {
  fetch(weatherApi + state)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch weather alerts.");
      }
     
 return response.json();
    })
    .then((data) => {
      displayAlerts(data, state);
      stateInput.value = "";
    })
    .catch((error) => {
      showError(error.message);
    });
}


function displayAlerts(data) {
  const count = data.features.length;

  const title = document.createElement("h2");
  title.textContent = `Weather Alerts: ${count}`;
  alertsDisplay.appendChild(title);

  const list = document.createElement("ul");

  data.features.forEach((alert) => {
    const item = document.createElement("li");
    item.textContent = alert.properties.headline;
    list.appendChild(item);
  });

  alertsDisplay.appendChild(list);
}


function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function clearUI() {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}
