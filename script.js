console.log("Main script running")
let d = new Date()
const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
const months = ['JANURAY', 'FEBRUARY', 'MARCH', 'APRIAL', 'MAY', 'JUNE', 'JULY', 'AUGUDT', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
const currentDay = days[d.getDay()];
const currentDate = d.getDate();
const currentMonth = months[d.getMonth()]
let displayDate = currentDay + " , " + currentDate + " " + currentMonth;
let timeNow = d.getHours()
let greeting = timeNow >= 5 && timeNow < 12 ? "Good Morning" : timeNow >= 12 && timeNow < 15 ? "Good Afternoon" : "Good evening";



const tabButtons = document.querySelectorAll('.btm-nav button');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(button => {
      button.classList.remove('active');
    });
    button.classList.add('active');
  });
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, set, get, onValue, child, push, update } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

// Paste the code from Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAawiXng6UUYdhIIEHAtU_M8RDlbuotmaY",
  authDomain: "test-60eeb.firebaseapp.com",
  databaseURL: "https://test-60eeb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-60eeb",
  storageBucket: "test-60eeb.aconsole.log(ppspot.com",
  messagingSenderId: "999588594553",
  appId: "1:999588594553:web:f2cb384c2cd7545a3625a8",
  measurementId: "G-Z3QLLR24FG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);




//Setting the count of each exercisetoString;
const dbRef = ref(getDatabase());
const starCountRef = ref(db, `${currentDay.toLowerCase()}/exercise`);
onValue(starCountRef, (snapshot) => {
  if (snapshot.exists()) {
    let data = snapshot.val();
    Object.keys(data)
      .forEach(function eachKey(key) {
        console.log(key)
        console.log(data)
        document.getElementById(key + 'Count').innerHTML = data[key];
      });
  } else {
    console.log("No data available");
  }
})


