console.log("hello")
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



//Chart 
const nullData = [0,0,0,0,0,0,0];
const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Armcircles',
    data:nullData,
    backgroundColor: [
      'rgba(255, 26, 104, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(0, 0, 0, 0.7)'
    ],
    borderWidth: 1
  }
]
};


const config = {
  type: 'bar',
  data,
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'black'
        }
      },
      title: {
        display: true,
        text: 'Daily activity',
        color: 'black'
      }
    },
    responsive: true,
  }

};

// render init block
const myChart = new Chart(
document.getElementById('myChart'),
config
);


// config 
const exercises = {};
const chartRef = ref(db, '/');
onValue(chartRef, (snapshot) => {
  if (snapshot.exists()) {
    let data = snapshot.val();
    console.log("data for graph")
    console.log(data)

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday','sunday'];
    for (const exercise in data[days[0]].exercise) {
      const exerciseData = [];
      for (const day of days) {
        exerciseData.push(data[day].exercise[exercise]);
        // console.log(exerciseData)
      }
      exercises[exercise] = exerciseData;
    }

    myChart.data.datasets[0].data = exercises.pushups;
    myChart.update();
  } else {
    console.log("No data available");
  }
})


const fitness = document.getElementById('fitness');
fitness.addEventListener('change',()=>{
  const label = fitness.options[fitness.selectedIndex].text;
  console.log(label)
  myChart.data.datasets[0].label = label;
  console.log(exercises[label.toLowerCase()]);
  myChart.data.datasets[0].data = exercises[label.toLowerCase()];
  myChart.update();
})



