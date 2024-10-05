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

// Capture habits and icons from form
function getHabitsAndIcons() {
  return {
    fajr: {
      habit: document.getElementById("fajr-habit").value.trim(),
      icon: document.getElementById("fajr-icon").value,
    },
    dhuhr: {
      habit: document.getElementById("dhuhr-habit").value.trim(),
      icon: document.getElementById("dhuhr-icon").value,
    },
    asr: {
      habit: document.getElementById("asr-habit").value.trim(),
      icon: document.getElementById("asr-icon").value,
    },
    maghrib: {
      habit: document.getElementById("maghrib-habit").value.trim(),
      icon: document.getElementById("maghrib-icon").value,
    },
    isha: {
      habit: document.getElementById("isha-habit").value.trim(),
      icon: document.getElementById("isha-icon").value,
    },
    userName: document.getElementById("user-name").value.trim(),
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
async function generatePrayerTable() {
  const tableBody = document.getElementById("prayer-times");
  tableBody.innerHTML = "";

  const { userName, ...habits } = getHabitsAndIcons(); // Get user-provided habits and icons
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const userHeading = getOrCreateHeading();
  userHeading.textContent = userName ? `${userName}'s Prayer and Habit Schedule`: "My Prayer and Habit Schedule";
  
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
    function tdHtml(prayerTime, habit, habitIcon, prayerName) {
      const randomQuote = `<span> ${getUniqueRandomQuote(prayerName)}</span` ; // Get unique quote for the prayer

      return `
      <div class="prayer-time-wrapper">
        <div class="prayer-time-habit">
          <input type="checkbox" /> ${prayerTime}
          ${habit ? `
          <div class="habit-wrapper">
            <span class="arrow">→</span> <input type="checkbox" />
            ${habitIcon ? `<i class="${habitIcon}"></i>` : ""} 
            <span class='habit-span'>${habit}</span>
          </div>` : ""}
        </div>
        <div class="motivation">${randomQuote}</div> 
      </div>`;
    }
    // For each prayer, show the prayer time, habit with icon
    const row = `
    <tr ${isToday ? 'class="highlight-today"' : ""}>
      <td>${adjustedDaysOfWeek[i]}</td>
      <td>${tdHtml(prayerTimes.fajr, habits.fajr.habit, habits.fajr.icon, 'fajr')}</td>
      <td>${tdHtml(prayerTimes.dhuhr, habits.dhuhr.habit, habits.dhuhr.icon, 'dhuhr')}</td>
      <td>${tdHtml(prayerTimes.asr, habits.asr.habit, habits.asr.icon, 'asr')}</td>
      <td>${tdHtml(prayerTimes.maghrib, habits.maghrib.habit, habits.maghrib.icon, 'maghrib')}</td>
      <td>${tdHtml(prayerTimes.isha, habits.isha.habit, habits.isha.icon, 'isha')}</td>
    </tr>
  `;

    tableBody.insertAdjacentHTML("beforeend", row);
  }
}



// Generate the table when the page loads or when habits are updated
generatePrayerTable();