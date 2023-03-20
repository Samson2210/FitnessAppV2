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

// BLUETOOTH CONNECTION 
const serviceUUID = "e267751a-ae76-11eb-8529-0242ac130003";
const startCharacteristicUUID = "19b10012-e8f2-537e-4f6c-d104768a1214";
const pauseCharacteristicUUID = "6995b940-b6f4-11eb-8529-0242ac130003";
const activityUUID = "00002a19-0000-1000-8000-00805f9b34fb";

let device;
let server;
let service;
let startCharacteristic;
let pauseCharacteristic;
let activityCharacteristic;
let value;

let armcirclesCounter = 0;
let crunchesCounter = 0;
let pushupsCounter = 0;

async function requestDevice() {
  try {
    console.log("Searching For Fitness Band...");

    device = await navigator.bluetooth.requestDevice({
      filters: [{ name: 'Fitness-Band' }],
      optionalServices: [serviceUUID]
    });

    console.log("Connected To Fitness Band Successfully!");

    const abortController = new AbortController();

    server = await device.gatt.connect();

    service = await server.getPrimaryService(serviceUUID);

    startCharacteristic = await service.getCharacteristic(startCharacteristicUUID);
    pauseCharacteristic = await service.getCharacteristic(pauseCharacteristicUUID);
    activityCharacteristic = await service.getCharacteristic(activityUUID);

    console.log("All Characteristics added successfully!");

    console.log('Watching advertisements from ' + device.name + '...');

    device.watchAdvertisements({ signal: abortController.signal })
      .catch(error => {
        console.log("Error: " + error);
      });

  } catch (error) {
    console.log("Failed: " + error);
  }
}

//request to start bluetooth service
// connect.addEventListener('click', requestDevice)

//Function to start activity
const startActivity = () => {
  console.log('Activity Started')
  var arr = new Int8Array([21, 31]);
  return startCharacteristic.writeValueWithResponse(arr).then(response => {
    return activityCharacteristic.startNotifications().then(_ => {
      console.log("Started Notifications");
      activityCharacteristic.addEventListener('characteristicvaluechanged', activityDataTransfer);
    });
  });
}

// start.addEventListener('click', startActivity);

//Function to Stop activity
const stopActivity = () => {
  console.log('Activity Stoped')
  var arr = new Int8Array([21, 31]);
  return pauseCharacteristic.writeValueWithResponse(arr).then(response => {
    return activityCharacteristic.stopNotifications()
      .then(_ => {
        console.log("Stopped Notifications");
        console.log("updating firebase")

        let pushups = pushupsCounter + parseInt(document.getElementById("pushupsCount").innerHTML)

        let squats = pushupsCounter + parseInt(document.getElementById("squatsCount").innerHTML)
        let armcircles = armcirclesCounter + parseInt(document.getElementById("armcirclesCount").innerHTML)

        writeUserData(pushups, squats, armcircles);
        reset();
      })
      .catch(error => {
        console.log('Argh! ' + error);
      });
  });
}

// document.getElementById('stop').addEventListener('click', stopActivity)


//Function to send activity data
function activityDataTransfer(event) {
  value = event.target.value.getInt8();
  if (value == 1) {
    armcirclesCounter = armcirclesCounter + 1;
    document.querySelector("#carmcirclesCount").innerHTML = armcirclesCounter;

  } else if (value == 10) {
    crunchesCounter = crunchesCounter + 1;
    document.querySelector("#csquatsCount").innerHTML = crunchesCounter;
  }
  else if (value == 2) {
    pushupsCounter = pushupsCounter + 1;
    document.querySelector("#cpushupsCount").innerHTML = pushupsCounter;
  }
}

function writeUserData(pushup, squat, armcircle) {
  const db = getDatabase();
  console.log('updating');
  set(ref(db, currentDay.toLowerCase() + '/exercise'), {
    pushups: parseInt(pushup),
    squats: parseInt(squat),
    armcircles: parseInt(armcircle)
  });
  console.log(armcircle);
}

const reset = () => {
  console.log('Reseting')
  armcirclesCounter = 0;
  crunchesCounter = 0;
  pushupsCounter = 0;
  document.querySelector("#carmcirclesCount").innerHTML = armcirclesCounter;
  document.querySelector("#csquatsCount").innerHTML = crunchesCounter;
  document.querySelector("#cpushupsCount").innerHTML = pushupsCounter;
}
