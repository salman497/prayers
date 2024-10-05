// Convert 24-hour format time to AM/PM
function convertToAMPM(time24) {
  let [hours, minutes] = time24.split(":");
  hours = parseInt(hours);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

// Function to get the user's location
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          resolve({ lat, lng });
        },
        (error) => {
          reject("Unable to retrieve location.");
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
}

let latitude = undefined;
let longitude = undefined;

// Modified fetchPrayerTimes to use dynamic location
const cacheForDate = {};
async function fetchPrayerTimes(date) {
  try {
    if (!cacheForDate[date.toDateString()]) {
      if (latitude === undefined || longitude === undefined) {
        const { lat, lng } = await getUserLocation();
        latitude = lat;
        longitude = lng;
      }
      const url = `https://api.aladhan.com/v1/timings/${Math.floor(
        date.getTime() / 1000
      )}?latitude=${latitude}&longitude=${longitude}&method=2`;

      const response = await fetch(url);
      const data = await response.json();
      cacheForDate[date.toDateString()] = {
        fajr: convertToAMPM(data.data.timings.Fajr),
        dhuhr: convertToAMPM(data.data.timings.Dhuhr),
        asr: convertToAMPM(data.data.timings.Asr),
        maghrib: convertToAMPM(data.data.timings.Maghrib),
        isha: convertToAMPM(data.data.timings.Isha),
      };
    }
    return cacheForDate[date.toDateString()];
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Capture habits from form and update table
function getHabits() {
  return {
    fajr: document.getElementById("fajr-habit").value.trim(),
    dhuhr: document.getElementById("dhuhr-habit").value.trim(),
    asr: document.getElementById("asr-habit").value.trim(),
    maghrib: document.getElementById("maghrib-habit").value.trim(),
    isha: document.getElementById("isha-habit").value.trim(),
  };
}

function getOrCreateHeading() {
  let element = document.getElementById("user-heading");
  if (!element) {
    const userHeading = document.createElement("h1");
    userHeading.id = "user-heading";
    document.body.prepend(userHeading);
    return userHeading;
  }
  return element;
}
// Object to store habits for each prayer
let prayerHabits = {
  fajr: [],
  dhuhr: [],
  asr: [],
  maghrib: [],
  isha: [],
};

// Function to add habit to a specific prayer
document.getElementById("add-habit").addEventListener("click", function () {
  const prayer = document.getElementById("prayer-select").value;
  const habit = document.getElementById("habit-name").value.trim();
  const icon = document.getElementById("habit-icon").value;
  const day = document.getElementById("habit-day").value;

  if (!prayerHabits[prayer]) {
    prayerHabits[prayer] = [];
  }

  prayerHabits[prayer].push({
    habit: habit,
    icon: icon,
    day: day
  });

  // Clear form inputs after adding habit
  //document.getElementById("habit-form").reset();
  generatePrayerTable(); 
});

// Modified function to render the table dynamically
async function generatePrayerTable() {
  const tableBody = document.getElementById("prayer-times");
  tableBody.innerHTML = "";

  const userName = document.getElementById("user-name").value.trim(); // Get user name
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const userHeading = getOrCreateHeading();
  userHeading.textContent = userName
    ? `${userName}'s Prayer and Habit Schedule`
    : "My Prayer and Habit Schedule";

  const todayDayOfWeek = today.getDay();
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const adjustedDaysOfWeek = daysOfWeek
    .slice(todayDayOfWeek)
    .concat(daysOfWeek.slice(0, todayDayOfWeek));

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    const prayerTimes = await fetchPrayerTimes(currentDate);
    const isToday = currentDate.getTime() === today.getTime();

    function tdHtml(prayerTime, prayerName, currentDay) {
      let habitHtml = prayerHabits[prayerName]
        .filter((habit) => habit.day === "all" || habit.day === currentDay)
        .map(
          (habit) =>
            `<div class="habit-wrapper">
               <span class="arrow">→</span> 
               <input type="checkbox" />
               ${habit.icon ? `<i class="td-font-icon ${habit.icon}"></i>` : ""}
               <span class='habit-span'>${habit.habit}</span>
             </div>`
        )
        .join("");
    
      const randomQuote = `<span> ${getUniqueRandomQuote(prayerName)}</span>`;
    
      return `
        <div class="prayer-time-wrapper">
          <div class="prayer-time-habit">
            <input type="checkbox" /> ${prayerTime} ${habitHtml}
          </div>
          <div class="motivation">${randomQuote}</div>
        </div>`;
    }

    const row = `
      <tr ${isToday ? 'class="highlight-today"' : ""}>
        <td>${adjustedDaysOfWeek[i]}</td>
        <td>${tdHtml(prayerTimes.fajr, "fajr", adjustedDaysOfWeek[i])}</td>
        <td>${tdHtml(prayerTimes.dhuhr, "dhuhr", adjustedDaysOfWeek[i])}</td>
        <td>${tdHtml(prayerTimes.asr, "asr", adjustedDaysOfWeek[i])}</td>
        <td>${tdHtml(prayerTimes.maghrib, "maghrib", adjustedDaysOfWeek[i])}</td>
        <td>${tdHtml(prayerTimes.isha, "isha", adjustedDaysOfWeek[i])}</td>
      </tr>`;

    tableBody.insertAdjacentHTML("beforeend", row);
  }
}

// Get elements
const customizeBtn = document.getElementById('customize-btn');
const habitPopup = document.getElementById('habit-popup');
const closePopupBtn = document.getElementById('close-popup');

// Open popup when the "Customize Your Habit" button is clicked
customizeBtn.addEventListener('click', () => {
  habitPopup.classList.add('active');
});

// Close popup when the "Close" button is clicked
closePopupBtn.addEventListener('click', () => {
  habitPopup.classList.remove('active');
});

// Optional: Close the popup if the user clicks outside the popup content
habitPopup.addEventListener('click', (event) => {
  if (event.target === habitPopup) {
    habitPopup.classList.remove('active');
  }
});

// Generate the table when the page loads or when habits are updated
generatePrayerTable();
