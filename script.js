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



async function generatePrayerTable() {
  const tableBody = document.getElementById("prayer-times");
  tableBody.innerHTML = "";

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

    // Create a row with the day's name and prayer times
    const row = `
      <tr ${isToday ? 'class="highlight-today"' : ""}>
        <td>${adjustedDaysOfWeek[i]}</td>
        <td><input type="checkbox" /> ${
          prayerTimes.fajr
        }<br><span class="motivation">${quotes.fajr[i]}</span></td>
        <td><input type="checkbox" /> ${
          prayerTimes.dhuhr
        }<br><span class="motivation">${quotes.dhuhr[i]}</span></td>
        <td><input type="checkbox" /> ${
          prayerTimes.asr
        }<br><span class="motivation">${quotes.asr[i]}</span></td>
        <td><input type="checkbox" /> ${
          prayerTimes.maghrib
        }<br><span class="motivation">${quotes.maghrib[i]}</span></td>
        <td><input type="checkbox" /> ${
          prayerTimes.isha
        }<br><span class="motivation">${quotes.isha[i]}</span></td>
      </tr>
    `;

    tableBody.insertAdjacentHTML("beforeend", row);
  }
} // Fetch and generate the table when the page loads


generatePrayerTable();
