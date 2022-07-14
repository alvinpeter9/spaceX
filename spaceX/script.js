const url = 'https://api.spacexdata.com/v4/launches/upcoming';
const card = document.getElementById('cards');

let strMonth = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();


fetch(url)
.then( response => {
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
})
.then(data=>data.map((d, index) => {
  if (d.date_local.slice(5, 7) == cMonth && (d.date_local.slice(8, 10) - cDay) < 4 ) {
    card.innerHTML += `
    <div id=${index} class=\'card\'>
     <h2> ${d.name} </h2>
     <hr>
     <h3>Set to Launch &#10003;</h3>
       <div class=\'card-text\'>
         Launching on ${d.date_local.slice(8, 10) +' '+ strMonth[d.date_local.slice(5, 7)-1] +' '+ d.date_local.slice(0, 4)} 
       </div>
       <div class=\'card-text\'>
         Flight Number: ${d.flight_number}
       </div>
     </div>`
     ;
  } else {
    card.innerHTML += `
    <div id=${index} class=\'card\'>
     <h2> ${d.name} </h2>
     <hr>
       <div class=\'card-text\'>
         Launch Date: ${d.date_local.slice(0, 10)} 
       </div>
       <div class=\'card-text\'>
         Flight Number: ${d.flight_number}
       </div>
     </div>`
    
  }
  }
))
.catch( error => 
  card.innerHTML += `<div class='\error\'>unable to retrieve data: ${error}</div>`);
