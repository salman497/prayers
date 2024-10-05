// Motivational Hadiths for each prayer time
const quotes = {
  fajr: [
    `Whoever prays Fajr is under the protection of Allah." (Muslim)`,
    `And the dawn as it breathes." (Quran 81:18)`,
    `Fajr is a sign of faith." (Bukhari)`,
    `The two Rak'ahs of Fajr are better than the world and everything in it." (Muslim 725)`,
    `Angels witness the prayer at Fajr." (Bukhari 574)`,
    `The best prayer after the obligatory prayers is Fajr." (Tirmidhi 438)`,
    `Fajr brings light to your heart and soul." (Bukhari 944)`,
    `Whoever prays Fajr in congregation will receive blessings." (Muslim 656)`,
    `The reward for Fajr in congregation is like that of praying all night." (Tirmidhi 221)`,
    `Wake up at Fajr, for it is the prayer of the righteous." (Muslim 1779)`,
    `The early morning has blessings hidden in it." (Tirmidhi 1216)`,
    `Fajr reminds us to start our day with Allah." (Muslim 629)`,
    `Pray Fajr and your day will be illuminated." (Tirmidhi 440)`,
    `The Prophet never missed the Fajr prayer." (Bukhari 1154)`,
    `Allah forgives the one who prays Fajr." (Muslim 746)`,
    `Start your day with submission to Allah in Fajr." (Bukhari 622)`,
    `Fajr is the light that chases away darkness." (Muslim 774)`,
    `The believer rises early for Fajr, while the hypocrite sleeps." (Bukhari 707)`,
    `Fajr brings the faithful closer to their Lord." (Muslim 618)`,
    `Perform Fajr, and your heart will find peace." (Tirmidhi 471)`,
  ],
  dhuhr: [
    `The most beloved of deeds to Allah is the prayer offered on time." (Bukhari)`,
    `He who offers Dhuhr prayer will be shielded from Hell." (Tirmidhi)`,
    `Take a break and remember Allah at Dhuhr." (Tirmidhi 421)`,
    `Dhuhr is a time to reflect on your blessings." (Bukhari 631)`,
    `Allah listens to those who call on Him at Dhuhr." (Muslim 728)`,
    `Dhuhr prayer brings serenity and tranquility." (Tirmidhi 447)`,
    `The midday prayer is a shield from evil." (Muslim 607)`,
    `The Prophet always prayed Dhuhr on time." (Bukhari 632)`,
    `At Dhuhr, bow before your Creator." (Tirmidhi 451)`,
    `Dhuhr prayer is a time to reconnect with Allah." (Muslim 719)`,
    `Allah loves those who are mindful of their Dhuhr prayer." (Bukhari 641)`,
    `Dhuhr reminds us to be grateful in the middle of our busy day." (Muslim 766)`,
    `Praying Dhuhr with sincerity brings immense rewards." (Tirmidhi 483)`,
    `Do not neglect the Dhuhr prayer, for it holds great virtue." (Bukhari 672)`,
    `Whoever offers Dhuhr prayer receives Allah's mercy." (Muslim 834)`,
    `Dhuhr is a time for believers to strengthen their faith." (Bukhari 751)`,
    `The Prophet said: ‘Guard your prayers, especially Dhuhr.' " (Muslim 614)`,
    `Dhuhr is the moment to remember Allah amidst the world’s distractions." (Bukhari 633)`,
    `Pray Dhuhr with full devotion, and Allah will answer your prayers." (Muslim 736)`,
    `The believer's soul is rejuvenated with Dhuhr prayer." (Tirmidhi 461)`,
  ],
  asr: [
    `He who observes Asr prayer will have no loss." (Bukhari)`,
    `Guard strictly your prayers, especially the middle prayer (Asr)." (Quran 2:238)`,
    `Asr prayer is a key to success." (Bukhari)`,
    `Whoever misses Asr intentionally, it is as if he lost his family and wealth." (Muslim 627)`,
    `The angels gather at the time of Asr to witness the believers' prayers." (Bukhari 494)`,
    `Asr reminds us of the passing time and to be mindful of Allah." (Tirmidhi 495)`,
    `The one who prays Asr will not miss the blessings of the day." (Bukhari 434)`,
    `Asr is the prayer that protects the believer from harm." (Muslim 609)`,
    `Asr is the bridge between the day’s effort and the night’s rest." (Bukhari 615)`,
    `Praying Asr brings the mercy of Allah upon you." (Tirmidhi 489)`,
    `Perform Asr prayer with sincerity, for it is witnessed by the angels." (Muslim 718)`,
    `The Prophet emphasized the importance of Asr in his last days." (Bukhari 489)`,
    `Asr reminds the believer that this life is short and temporary." (Tirmidhi 495)`,
    `Whoever prays Asr on time is successful in the sight of Allah." (Muslim 734)`,
    `The Prophet prayed Asr regularly and reminded others to do the same." (Bukhari 533)`,
    `Asr prayer purifies the soul of a believer." (Muslim 673)`,
    `Pray Asr with focus, for it is a shield from evil." (Tirmidhi 496)`,
    `Allah listens closely to those who pray Asr with sincerity." (Bukhari 607)`,
    `Asr serves as a reminder of Allah's mercy and power." (Muslim 717)`,
    `Those who offer Asr receive blessings for the rest of the day." (Tirmidhi 497)`,
  ],
  maghrib: [
    `Pray before the sun sets." (Muslim)`,
    `Maghrib brings calmness to your soul." (Bukhari)`,
    `Give thanks as the day ends with Maghrib." (Muslim 636)`,
    `The Prophet loved the Maghrib prayer and offered it without fail." (Bukhari 606)`,
    `At Maghrib, reflect on the blessings of the day." (Tirmidhi 433)`,
    `Maghrib prayer closes the day’s book of deeds." (Muslim 741)`,
    `Pray Maghrib, and you will be protected from harm." (Bukhari 739)`,
    `The Prophet said: ‘Do not delay Maghrib, for it brings peace to the heart.' " (Muslim 732)`,
    `As the sun sets, Maghrib brings us closer to Allah." (Tirmidhi 461)`,
    `Those who offer Maghrib are enveloped in Allah’s mercy." (Muslim 611)`,
    `Maghrib prayer is a time of reflection and gratitude." (Bukhari 618)`,
    `Perform Maghrib and feel the tranquility wash over you." (Tirmidhi 496)`,
    `The believer is closest to Allah during Maghrib." (Muslim 745)`,
    `Maghrib cleanses the soul and brings peace to the heart." (Bukhari 627)`,
    `The Prophet said that Maghrib prayer removes sins like the shedding of leaves." (Tirmidhi 471)`,
    `Maghrib prayer is the key to serenity after a long day." (Muslim 645)`,
    `The angels descend to witness the Maghrib prayer." (Bukhari 594)`,
    `At Maghrib, remember Allah for the blessings of the day." (Muslim 703)`,
    `Maghrib is a time for forgiveness and mercy." (Bukhari 701)`,
    `Maghrib reminds the believer to thank Allah for the day's gifts." (Muslim 727)`,
  ],
  isha: [
    `Praying Isha removes sins, like a tree shedding leaves." (Muslim)`,
    `Isha prayer brings peace to your heart." (Tirmidhi)`,
    `End your day with Allah and sleep peacefully." (Tirmidhi 479)`,
    `Isha is the time to remember Allah before resting." (Bukhari 659)`,
    `The Prophet encouraged believers to pray Isha in congregation." (Muslim 609)`,
    `Those who pray Isha will have light in their hearts." (Bukhari 756)`,
    `Isha is the final key to closing the day's chapter." (Tirmidhi 528)`,
    `Isha wipes away the fatigue and worries of the day." (Muslim 682)`,
    `Whoever prays Isha in congregation, it is as if he prayed half the night." (Tirmidhi 514)`,
    `The angels surround the believer who prays Isha with sincerity." (Bukhari 583)`,
    `Isha brings serenity to the soul." (Muslim 748)`,
    `The Prophet said: ‘Whoever prays Isha, it is as if he prayed the whole night.' " (Bukhari 715)`,
    `Pray Isha, and your sins will be forgiven." (Tirmidhi 508)`,
    `Isha is a shield from the worries of the world." (Muslim 756)`,
    `Those who pray Isha will enter Paradise." (Bukhari 711)`,
    `Isha brings the believer closer to their Creator." (Muslim 748)`,
    `Pray Isha before you rest, and Allah will protect you." (Bukhari 598)`,
    `The Prophet never missed Isha, even during travel." (Muslim 743)`,
    `Isha washes away the sins of the day." (Tirmidhi 508)`,
    `Allah rewards those who conclude their day with Isha." (Bukhari 744)`,
  ],
};

const usedQuotes = {
  fajr: [],
  dhuhr: [],
  asr: [],
  maghrib: [],
  isha: []
};

// Function to get a unique random quote for the week
function getUniqueRandomQuote(prayer) {
  const prayerQuotes = quotes[prayer];
  const alreadyUsed = usedQuotes[prayer];

  // If all quotes have been used, reset the used list for this prayer
  if (alreadyUsed.length === prayerQuotes.length) {
    usedQuotes[prayer] = [];
  }

  // Filter available quotes that haven't been used
  const availableQuotes = prayerQuotes.filter((_, index) => !alreadyUsed.includes(index));

  // Pick a random index from available quotes
  const randomIndex = Math.floor(Math.random() * availableQuotes.length);

  // Get the quote using the random index
  const quoteIndex = prayerQuotes.indexOf(availableQuotes[randomIndex]);

  // Mark this quote as used
  usedQuotes[prayer].push(quoteIndex);

  return prayerQuotes[quoteIndex];
}


const iconOptions = [
  { name: '🏃', value: 'fas fa-running' },
  { name: '📚', value: 'fas fa-book' },
  { name: '❤️', value: 'fas fa-heart' },
  { name: '🏋️', value: 'fas fa-dumbbell' },
  { name: '🚴', value: 'fas fa-biking' },
  { name: '🎵', value: 'fas fa-music' },
  { name: '🧘', value: 'fas fa-yoga' },
  { name: '🥕', value: 'fas fa-carrot' },
  { name: '💧', value: 'fas fa-water' },
  { name: '☕', value: 'fas fa-coffee' },
  { name: '🌳', value: 'fas fa-tree' },
  { name: '💻', value: 'fas fa-code' },
  { name: '🎸', value: 'fas fa-guitar' },
  { name: '🎨', value: 'fas fa-paint-brush' },
  { name: '🎥', value: 'fas fa-film' },
  { name: '🏊', value: 'fas fa-swimmer' },
  { name: '🛌', value: 'fas fa-bed' },
  { name: '🙏', value: 'fas fa-praying-hands' },
  { name: '✍️', value: 'fas fa-pen' },
  { name: '✈️', value: 'fas fa-plane' },
  { name: '🧠', value: 'fas fa-mind' },
  { name: '⚖️', value: 'fas fa-weight' },
  { name: '💰', value: 'fas fa-wallet' },
  { name: '🧘', value: 'fas fa-meditation' },
  { name: '🏆', value: 'fas fa-trophy' },
  { name: '🏫', value: 'fas fa-school' },
  { name: '🌍', value: 'fas fa-language' },
  { name: '📏', value: 'fas fa-pencil-ruler' },
  { name: '💎', value: 'fas fa-gem' },
  { name: '🚭', value: 'fas fa-smoking-ban' },
  { name: '🗓️', value: 'fas fa-calendar-check' },
  { name: '📷', value: 'fas fa-camera' },
  { name: '🧠', value: 'fas fa-brain' },
  { name: '☀️', value: 'fas fa-sun' },
  { name: '🚶', value: 'fas fa-walking' },
  { name: '⚽', value: 'fas fa-futbol' },
  { name: '🌱', value: 'fas fa-seedling' },
  { name: '💡', value: 'fas fa-lightbulb' },
  { name: '🌐', value: 'fas fa-globe' },
  { name: '🍪', value: 'fas fa-cookie-bite' },
  { name: '🍃', value: 'fas fa-leaf' },
  { name: '📞', value: 'fas fa-phone' },
  { name: '🤝', value: 'fas fa-hands-helping' },
  { name: '🔧', value: 'fas fa-tools' },
  { name: '🚿', value: 'fas fa-shower' },
  { name: '🚗', value: 'fas fa-car' },
  { name: '🍽️', value: 'fas fa-utensils' },
  { name: '🐱', value: 'fas fa-cat' },
  { name: '🎲', value: 'fas fa-dice' }
];

function loadDropDown() {


  const prayerElement = document.getElementById('habit-icon');
    iconOptions.forEach(option => {
      const newOption = document.createElement('option');
      newOption.value = option.value;
      newOption.text = option.name;
      prayerElement.appendChild(newOption);
    });
 
};


 loadDropDown();

