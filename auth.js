// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { deleteDoc, getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

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
  const saveBtn = document.getElementById('save-btn');
  
  if (user) {
    // User is logged in
    loginButton.innerHTML = '<i class="fab fa-google"></i> <span>Logout</span>';
    loginButton.removeEventListener('click', login); // Remove previous login handler
    loginButton.addEventListener('click', logout); // Add logout handler
    saveBtn.style.display = 'block'; // Show save button
    // Display welcome message
    document.getElementById('user-name').value = `${capitalizeName(user.displayName)}`;
  } else {
    // User is logged out
    loginButton.innerHTML = '<i class="fab fa-google"></i> <span>Login</span>';
    loginButton.removeEventListener('click', logout); // Remove previous logout handler
    loginButton.addEventListener('click', login); // Add login handler
    saveBtn.style.display = 'none'; // Hide save button
    // Clear welcome message
    document.getElementById('user-name').value = '';
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
      window.location.reload(); // Refresh the page
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
    const deleteBtn = document.getElementById('delete-all-btn');
  
    try {
      const docRef = doc(db, 'habits', user.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        prayerHabits = JSON.parse(docSnap.data().habits); // Parse the habits
  
        if (habitExist()) {
          // If habits exist, show the delete button
          deleteBtn.style.display = 'block';
        } else {
          // If no habits exist, hide the delete button
          deleteBtn.style.display = 'none';
        }
      } else {
        // No habits found, hide the delete button
        console.log('No habits found for this user.');
        deleteBtn.style.display = 'none';
      }
    } catch (error) {
      console.error('Error loading habits:', error);
      // In case of an error, hide the delete button as a fallback
      deleteBtn.style.display = 'none';
    }
  }
// Monitor Auth State Changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    updateAuthUI(user); // Update UI to show logout button and welcome message
    await loadUserHabits(user); // Load user habits
  } else {
    updateAuthUI(null); // Update UI to show login button
  }
  generatePrayerTable(); 

});

function capitalizeName(name) {
    return name
      .toLowerCase() // Convert the whole string to lowercase first
      .split(' ')    // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' ');    // Join the words back into a single string
  }

  document.getElementById('delete-all-btn').addEventListener('click', deleteAllUserInfo);
  
  async function deleteAllUserInfo() {
    const user = auth.currentUser;
  
    if (user) {
      try {
        // Delete the user's habits document from Firestore
        await deleteDoc(doc(db, 'habits', user.uid));
  
        // Clear the local habit array and update the UI
        prayerHabits = [];
        
  
        alert('All habits deleted successfully!');
        window.location.reload(); // Refresh the
      } catch (error) {
        console.error('Error deleting user habits:', error);
      }
    } else {
      alert('No user is currently logged in.');
    }
  }


  function habitExist() {
    return prayerHabits.fajr.length > 0 || prayerHabits.dhuhr.length > 0 || prayerHabits.asr.length > 0 || prayerHabits.maghrib.length > 0 || prayerHabits.isha.length > 0;
  }