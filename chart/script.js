import { Chart } from "chart.js";
const nullData = [0, 0, 0, 0, 0, 0, 0];
const data = {
    labels: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Armcircles',
      data: nullData,
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
    },
    {
      label: 'Pushups',
      data: nullData,
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
    },
    {
      label: 'Squats',
      data: nullData,
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
  const chartRef = ref(db, '/');
  let armcirclesData=[];
  let pushupsData=[];
  let squatsData=[];
  
    onValue(chartRef, (snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        // console.log(Object.keys(data).length) this is 7 for now
        
        let JSonObj = {data}
        console.log(data[currentDay.toLowerCase()].exercise['armcircles'])
        let day = currentDay.toLowerCase()
        console.log(day)
        console.log(Object.values(JSonObj))
  
        // armcirclesData = Object.values(JSonObj).map(i => console.log(i));
        // pushupsData = Object.values(data).map(i => i.exercise.pushups);
        // squatsData = Object.values(data).map(i => i.exercise.squats);
        console.log(JSonObj.monday.exercise.armcircles)
        armcirclesData.push(JSonObj.sunday.exercise.armcircles)
        armcirclesData.push(JSonObj.monday.exercise.armcircles)
        armcirclesData.push(JSonObj.tuesday.exercise.armcircles)
        armcirclesData.push(JSonObj.wednesday.exercise.armcircles)
        armcirclesData.push(JSonObj.thursday.exercise.armcircles)
        armcirclesData.push(JSonObj.friday.exercise.armcircles)
        armcirclesData.push(JSonObj.saturday.exercise.armcircles)
  
        pushupsData.push(JSonObj.sunday.exercise.pushups)
        pushupsData.push(JSonObj.monday.exercise.pushups)
        pushupsData.push(JSonObj.tuesday.exercise.pushups)
        pushupsData.push(JSonObj.wednesday.exercise.pushups)
        pushupsData.push(JSonObj.thursday.exercise.pushups)
        pushupsData.push(JSonObj.friday.exercise.pushups)
        pushupsData.push(JSonObj.saturday.exercise.pushups)
  
        squatsData.push(JSonObj.sunday.exercise.squats)
        squatsData.push(JSonObj.monday.exercise.squats)
        squatsData.push(JSonObj.tuesday.exercise.squats)
        squatsData.push(JSonObj.wednesday.exercise.squats)
        squatsData.push(JSonObj.thursday.exercise.squats)
        squatsData.push(JSonObj.friday.exercise.squats)
        squatsData.push(JSonObj.saturday.exercise.squats)
        
        myChart.data.datasets[0].data = armcirclesData;
        myChart.data.datasets[1].data = pushupsData;
        myChart.data.datasets[2].data = squatsData;
        myChart.update();
      } else {
        console.log("No data available");
      }
    })