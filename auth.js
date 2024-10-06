// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3ESuUFSXEGMAKkRsru8_B0-fma_Bteq8",
    authDomain: "prayer-82741.firebaseapp.com",
    projectId: "prayer-82741",
    storageBucket: "prayer-82741.appspot.com",
    messagingSenderId: "83214044445",
    appId: "1:83214044445:web:60d6c77e33491b691725f4",
    measurementId: "G-75V30Q4QRP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore Database

// Google Auth provider
const provider = new GoogleAuthProvider();

// Function to handle login and logout UI
function updateAuthUI(user) {
  const loginButton = document.getElementById('login-btn');
  const welcomeMessage = document.getElementById('welcome-message');
  const saveBtn = document.getElementById('save-btn');
  
  if (user) {
    // User is logged in
    loginButton.innerHTML = '<i class="fab fa-google"></i> Logout';
    loginButton.removeEventListener('click', login); // Remove previous login handler
    loginButton.addEventListener('click', logout); // Add logout handler
    saveBtn.style.display = 'block'; // Show save button
    // Display welcome message
    welcomeMessage.textContent = `Welcome, ${user.displayName}!`;
  } else {
    // User is logged out
    loginButton.innerHTML = '<i class="fab fa-google"></i> Login with Google';
    loginButton.removeEventListener('click', logout); // Remove previous logout handler
    loginButton.addEventListener('click', login); // Add login handler
    saveBtn.style.display = 'none'; // Hide save button
    // Clear welcome message
    welcomeMessage.textContent = '';
  }
}

// Login function
function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      updateAuthUI(user); // Update UI after login
      loadUserHabits(user); // Load user habits from Firestore
    })
    .catch((error) => {
      console.error('Login Error:', error);
    });
}

// Logout function
function logout() {
  signOut(auth)
    .then(() => {
      updateAuthUI(null); // Update UI after logout
    })
    .catch((error) => {
      console.error('Logout Error:', error);
    });
}

// Save user habits to Firestore
document.getElementById('save-btn').addEventListener('click', async () => {
  const user = auth.currentUser;
  const userHabits = JSON.stringify(prayerHabits); // Serialize the habits

  if (user) {
    try {
      await setDoc(doc(db, 'habits', user.uid), {
        habits: userHabits,
        userName: user.displayName
      });
      alert('Habits saved successfully!');
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  }
});

// Load saved habits from Firestore
async function loadUserHabits(user) {
  try {
    const docRef = doc(db, 'habits', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      prayerHabits = JSON.parse(docSnap.data().habits); // Parse the habits
      document.getElementById('user-name').value = docSnap.data().userName;
      generatePrayerTable(); // Regenerate the table based on loaded habits
    } else {
      console.log('No habits found for this user.');
    }
  } catch (error) {
    console.error('Error loading habits:', error);
  }
}

// Monitor Auth State Changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    updateAuthUI(user); // Update UI to show logout button and welcome message
    loadUserHabits(user); // Load user habits
  } else {
    updateAuthUI(null); // Update UI to show login button
  }
});