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
async function fetchPrayerTimes(date) {
  try {
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

    return {
      fajr: convertToAMPM(data.data.timings.Fajr),
      dhuhr: convertToAMPM(data.data.timings.Dhuhr),
      asr: convertToAMPM(data.data.timings.Asr),
      maghrib: convertToAMPM(data.data.timings.Maghrib),
      isha: convertToAMPM(data.data.timings.Isha),
    };
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

async function generatePrayerTable() {
  const tableBody = document.getElementById("prayer-times");
  tableBody.innerHTML = "";

  const habits = getHabits(); // Get the user-provided habits

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

    // For each prayer, show the prayer time, motivation, and habit in the same column
    const row = `
      <tr ${isToday ? 'class="highlight-today"' : ""}>
        <td>${adjustedDaysOfWeek[i]}</td>
        <td>
          <div class="prayer-time-wrapper">
            <input type="checkbox" /> ${prayerTimes.fajr}
            ${habits.fajr ? `
            <div class="habit-wrapper">
              <span class="arrow">→</span> 
              <input type="checkbox" /> ${habits.fajr}
            </div>` : ""}
          </div>
          <span class="motivation">${quotes.fajr[i]}</span>
        </td>
        <td>
          <div class="prayer-time-wrapper">
            <input type="checkbox" /> ${prayerTimes.dhuhr}
            ${habits.dhuhr ? `
            <div class="habit-wrapper">
              <span class="arrow">→</span> 
              <input type="checkbox" /> ${habits.dhuhr}
            </div>` : ""}
          </div>
          <span class="motivation">${quotes.dhuhr[i]}</span>
        </td>
        <td>
          <div class="prayer-time-wrapper">
            <input type="checkbox" /> ${prayerTimes.asr}
            ${habits.asr ? `
            <div class="habit-wrapper">
              <span class="arrow">→</span> 
              <input type="checkbox" /> ${habits.asr}
            </div>` : ""}
          </div>
          <span class="motivation">${quotes.asr[i]}</span>
        </td>
        <td>
          <div class="prayer-time-wrapper">
            <input type="checkbox" /> ${prayerTimes.maghrib}
            ${habits.maghrib ? `
            <div class="habit-wrapper">
              <span class="arrow">→</span> 
              <input type="checkbox" /> ${habits.maghrib}
            </div>` : ""}
          </div>
          <span class="motivation">${quotes.maghrib[i]}</span>
        </td>
        <td>
          <div class="prayer-time-wrapper">
            <input type="checkbox" /> ${prayerTimes.isha}
            ${habits.isha ? `
            <div class="habit-wrapper">
              <span class="arrow">→</span> 
              <input type="checkbox" /> ${habits.isha}
            </div>` : ""}
          </div>
          <span class="motivation">${quotes.isha[i]}</span>
        </td>
      </tr>
    `;

    tableBody.insertAdjacentHTML("beforeend", row);
  }
}
// Generate the table when the page loads or when habits are updated
generatePrayerTable();