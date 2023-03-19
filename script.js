// const date = document.getElementById('date')
// const greet = document.getElementById('greeting')
// let counter = 0
// setInterval(() => {
// 		if(counter<=99){
// 			counter+=2
//             console.log(counter);
// 		}
//     document.getElementById('counterElement').style.setProperty('--value', counter)
// }, 1000)

// setInterval(() => {
// 	    function beats(a,b){
//             return Math.floor(Math.random()* (a - b + 2) + a)
//         }
//     let Bpm = beats(70,75)
//     console.log(Bpm);
//     document.getElementById('counterElement2').style.setProperty('--value', Bpm)
// }, 1000)


// let counter1 = 100
// setInterval(() => {
// 		if(counter1<=100){
// 			counter1--
// 		}
//     document.getElementById('counterElement1').style.setProperty('--value', counter1)
// }, 1000)


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
        console.log(data)
        document.getElementById(key + 'Count').innerHTML = data[key];
      });
  } else {
    console.log("No data available");
  }
})


//Stat page workout selector
const item1 = document.getElementById("item1");
const item2 = document.getElementById("item2");
const item3 = document.getElementById("item3");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");


item1.addEventListener("click", ()=>{
  showCard(card1)
  hideCard(card2)
  hideCard(card3)
})

item2.addEventListener("click", ()=>{
  showCard(card2);
  hideCard(card1);
  hideCard(card3);
})

item3.addEventListener("click", ()=>{
  showCard(card3);
  hideCard(card1);
  hideCard(card2);
})

function showCard(card) {
  card.classList.remove("hidden");
}

function hideCard(card){
  card.classList.add("hidden");
}


const button = document.getElementById("start")
const output = document.getElementById("display")
let i = 0
button.addEventListener("click",()=>{
  i++
  console.log(i);
})