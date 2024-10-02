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

  const habits = getHabits();

  // Get table header elements
  const fajrHeader = document.getElementById("fajr-habit-th");
  const dhuhrHeader = document.getElementById("dhuhr-habit-th");
  const asrHeader = document.getElementById("asr-habit-th");
  const maghribHeader = document.getElementById("maghrib-habit-th");
  const ishaHeader = document.getElementById("isha-habit-th");

  // Update and display the habit headers only if the habit is provided
  fajrHeader.textContent = habits.fajr ? habits.fajr : "";
  fajrHeader.style.display = habits.fajr ? "" : "none";

  dhuhrHeader.textContent = habits.dhuhr ? habits.dhuhr : "";
  dhuhrHeader.style.display = habits.dhuhr ? "" : "none";

  asrHeader.textContent = habits.asr ? habits.asr : "";
  asrHeader.style.display = habits.asr ? "" : "none";

  maghribHeader.textContent = habits.maghrib ? habits.maghrib : "";
  maghribHeader.style.display = habits.maghrib ? "" : "none";

  ishaHeader.textContent = habits.isha ? habits.isha : "";
  ishaHeader.style.display = habits.isha ? "" : "none";

  const today = new Date(); // Get today's date
  today.setHours(0, 0, 0, 0); // Set time to midnight to avoid time comparison issues

  // Get the current day of the week as an index (0 = Sunday, ..., 6 = Saturday)
  const todayDayOfWeek = today.getDay();

  // Days of the week starting from today
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  // Reorder the daysOfWeek array to start with today
  const adjustedDaysOfWeek = daysOfWeek
    .slice(todayDayOfWeek)
    .concat(daysOfWeek.slice(0, todayDayOfWeek));

  // Generate prayer times for the next 7 days starting from today
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today); // Start from today's date
    currentDate.setDate(today.getDate() + i); // Add i days to today

    // Fetch prayer times for the current date
    const prayerTimes = await fetchPrayerTimes(currentDate);

    // Check if the current date matches today's date
    const isToday = currentDate.getTime() === today.getTime(); // Compare the exact date, not just the day

    // Create a row with the day's name, prayer times, and custom habits
    const row = `
      <tr ${isToday ? 'class="highlight-today"' : ""}>
        <td>${adjustedDaysOfWeek[i]}</td>
        <td><input type="checkbox" /> ${prayerTimes.fajr}<br><span class="motivation">${quotes.fajr[i]}</span></td>
        ${habits.fajr ? `<td><input type="checkbox" /> ${habits.fajr}</td>` : ""}
        <td><input type="checkbox" /> ${prayerTimes.dhuhr}<br><span class="motivation">${quotes.dhuhr[i]}</span></td>
        ${habits.dhuhr ? `<td><input type="checkbox" /> ${habits.dhuhr}</td>` : ""}
        <td><input type="checkbox" /> ${prayerTimes.asr}<br><span class="motivation">${quotes.asr[i]}</span></td>
        ${habits.asr ? `<td><input type="checkbox" /> ${habits.asr}</td>` : ""}
        <td><input type="checkbox" /> ${prayerTimes.maghrib}<br><span class="motivation">${quotes.maghrib[i]}</span></td>
        ${habits.maghrib ? `<td><input type="checkbox" /> ${habits.maghrib}</td>` : ""}
        <td><input type="checkbox" /> ${prayerTimes.isha}<br><span class="motivation">${quotes.isha[i]}</span></td>
        ${habits.isha ? `<td><input type="checkbox" /> ${habits.isha}</td>` : ""}
      </tr>
    `;

    // Insert the row into the table body
    tableBody.insertAdjacentHTML("beforeend", row);
  }
}

// Generate the table when the page loads or when habits are updated
generatePrayerTable();