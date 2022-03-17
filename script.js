const ipTracker = document.getElementById("ip-tracker");
const ipInput = document.getElementById("ip-input");
const submitBtn = document.querySelector(".ip-input__submit");

// IP INFO
const [ipAddress, ipLocation, timezone, ispInfo] =
  document.querySelectorAll(".ip-info__result");

// MAP
var map = L.map("map");

var states = {
  Alabama: "AL",
  Alaska: "AK",
  "American Samoa": "AS",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  "District Of Columbia": "DC",
  "Federated States Of Micronesia": "FM",
  Florida: "FL",
  Georgia: "GA",
  Guam: "GU",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  "Marshall Islands": "MH",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Northern Mariana Islands": "MP",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Palau: "PW",
  Pennsylvania: "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  "Virgin Islands": "VI",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

const setInitialValues = () => {
  ipTracker.style.height = `${
    ipTracker.offsetHeight - document.querySelector(".ip-info").offsetHeight / 2
  }px`;

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (ipInput.value === "") {
      ipInput.setAttribute("placeHolder", "Please enter an IP address");
      return;
    }
    await getIpInfo();
  });

  // Set map
  map.setView([51.505, -0.09], 13);
  L.marker([51.505, -0.09]).addTo(map);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1Ijoiam9obmprYW5nIiwiYSI6ImNsMHU4dHo1bTB1d3QzaXA0NXJteHFwbzcifQ.K-gNYVVaL3fjR2C0QA84Gg",
    }
  ).addTo(map);
};

const getIpInfo = async () => {
  console.log("working");
  console.log(ipInput.value);
  const result = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=
    at_AsF9Z9AS10NZJlmdl0Mkz8JHGw1kV&ipAddress=${ipInput.value}`
  );
  if (!result.ok) throw new error("Could not get IP information");

  const data = await result.json();
  const { isp, location } = data;

  console.log(data);

  ipAddress.innerText = ipInput.value;
  ipLocation.innerText = `${location.city}, ${
    location.region in states ? states[location.region] : ""
  }`;
  timezone.innerText = `UTC ${location.timezone}`;
  ispInfo.innerText = isp;

  await setMap(location);
};

const setMap = async ({ lat, lng }) => {
  map.panTo(new L.LatLng(lat, lng));
  L.marker([lat, lng]).addTo(map);
};

const init = () => {
  setInitialValues();
};

init();
