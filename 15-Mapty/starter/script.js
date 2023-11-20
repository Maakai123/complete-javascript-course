'use strict';


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');





class Workout{
  date = new Date();

  id = (Date.now() + '').slice(-10) //last 10 digits
clicks = 0;
constructor(coords, distance, duration){
  this.coords = coords; //Array of [lat, log]
  this.distance = distance; //in Km
  this.duration = duration; // in min
  
}

_setDescription(){
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 this.description  = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]}
 ${this.date.getDate()}`  
 //if months[0] = january, months[1] = febuary
 //When ever a new date is set automatically the description is set

}

click(){
  this.click++;
}
}
//child class that inherits from parent class

class Running extends Workout{
  type ='running';
constructor(coords, distance, duration, cadence){
  //initiate the this keyword from parents
  super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace(); 
    this._setDescription(); //we need it in child;
   
}

//Methods
//min/km 
calcPace(){
  this.pace = this.duration / this.distance;
  return this.pace
}

}


class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain){
    //initiate the this keyword from parents
    super(coords, distance, duration);
      this.elevationGain = elevationGain;
      this.calcSpeed();
      this._setDescription(); //we need it in child;
  }

 calcSpeed(){
  //km/h  duration is not in minute but hours
  this.speed = this.distance / (this.duration / 60)
  return this.speed;
 } 
}




/////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

//Geolocation Api is the browser Api; (success and error)

class App {
//make map and mapEvent private
#map;
#mapZoomlevel = 13 
#mapEvent;
#workouts = [];

//everything inside constructor  executes when the app loads 
  constructor(){ //always no that when a new object is created the constructor is called
    //Get user's position

    this._getPosition()


    //Get data from local storage 
    this._getLocalStorage()

    form.addEventListener('submit', this._newWorkout.bind(this)) //use bind b/c the this keyword =>towards form, with bind this => app obj

    //for form not to reload
      //add change event to the select
      inputType.addEventListener('change', this._toggleElevationField)
      containerWorkouts.addEventListener('click',this._moveToPopup.bind(this))

  }

  
  
  //Methods
  _getPosition(){ //this will geolocation 
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){ //success(first, function) and eror
            alert('could not get your position')
        })
    }
  
  }

  //Js will call this._loadMap and pass position parameter into once we know the position

_loadMap(position){ // loadMap = callBack getCurrentPosition

    const {latitude} = position.coords //co-ordinate object
    const{longitude} = position.coords
    const coords = [latitude, longitude]

     this.#map = L.map('map').setView(coords, this.#mapZoomlevel); //instead of saying const map, use the global variable
//this.#map will return undefined, we need to bind(this) this will point to the current obj

L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.#map);

//Event listener hadling clicks on map , on is from the leaftlet object
this.#map.on('click', this._showForm.bind(this)) //this key word => map
  

//this is rendered b/c the map is already available
 this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work)
     });
 }


_showForm( mapE){
  this.#mapEvent = mapE
  form.classList.remove('hidden');
  inputDistance.focus()//make it focus
}


_hideForm(){
  //clear input fields 
  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''; 
  
 //  hide form 
 form.style.display = ' none';
 form.classList.add('hidden')
 setTimeout(() => (form.style.display = 'grid'), 1000) //hide after 1 mili-seconds
 
}



_toggleElevationField(){
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
}

_newWorkout(e){
const validInputs = (...inputs) => 
inputs.every(inp => Number.isFinite(inp)) //If all element in the array is Finite it will true, but if only
// 1 is not Finite, 'every' will return false


//Helper function 

//check for positive, return true if all are greater than zero

const allPositive = (...inputs) => inputs.every(inp => inp > 0)


  e.preventDefault()

// Get data from form
const type = inputType.value;
const distance = +inputDistance.value;
const duration = +inputDuration.value;
const {lat, lng } = this.#mapEvent.latlng //latlng object from the library, lat and lat are found

//since workout cant be accesed outside of the block
let workout;

//if workout running, create running object

if(type === 'running'){ 
  const cadence = +inputCadence.value;
//check if  data is valid; when one is not vaSlid
/*if(!Number.isFinite(distance)||
     !Number.isFinite(duration)||
     !Number.isFinite(cadence)
) */

if(
  !validInputs(distance, duration, cadence)||
  !allPositive(distance, duration,cadence)
) { //if distance, duration and cadence are numbers input will be true;

 return alert('Inputs have to be positive numbers') //return when input is not true;
//create new obj


  
}

workout = new Running([lat,lng], distance, duration, cadence)

}

//if workout cycling, create cycling obj

if(type === 'cycling'){
  const elevation = +inputElevation.value

  //check if  data is valid; when one is not valid
/*if(!Number.isFinite(distance)||
     !Number.isFinite(duration)||
     !Number.isFinite(cadence)
) */
if(!validInputs(distance, duration, elevation)||
!allPositive(distance, duration)) {
  return alert('Inputs have to be positive numbers')
 }

 workout = new Cycling([lat, lng], distance, duration, elevation);
}



//call all the methods


//Add new object to workout array

this.#workouts.push(workout)
//Render workout on map as marker
this._renderWorkoutMarker(workout)

//Render workout on list
this._renderWorkout(workout)
//Hide form + clear input fields 
this._hideForm();

this._setLocalStorage();
    
}


_renderWorkoutMarker(workout){
  L.marker(workout.coords)
  .addTo(this.#map)
    .bindPopup(
      L.popup({
        maxWidth:250,
        minWidth:100,
        autoClose:false, //stop from closing
        closeOnClick:false, //wont close after clicking
        className:`${workout.type}-popup`,
      })
    ) 
    .setPopupContent(
      `${workout.type === 'running'? '🏃':'🚴‍♀️'
  }${workout.description}`)
    .openPopup();
}



_renderWorkout(workout){
  let  html = `
  <li class="workout workout--${workout.type}" data-id="${workout.id}">
  <h2 class="workout__title">${workout.description}</h2>
  <div class="workout__details">
    <span class="workout__icon">${workout.type === 'running'? '🏃':'🚴‍♀️'
  }</span>
    <span class="workout__value">${workout.distance}</span>   
    <span class="workout__unit">km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⏱</span>
    <span class="workout__value">${workout.duration}</span>
    <span class="workout__unit">min</span>
  </div>`;

  if(workout.type === 'running')
  //  add re assigned html
      html +=  `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
      </div>
      </li>`

    //toFixed round up decimal to 1 decimal place
      if(workout.type === 'cycling')
      html += ` 
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div> 
  </li>`;

 form.insertAdjacentHTML('afterend', html)
}

//(afterend)we want the sibling element to be at the end of the form 

_moveToPopup(e){
  const workoutEl = e.target.closest('.workout')
 console.log(workoutEl)

if(!workoutEl) return //if there is no workoutEl return 
 
  const workout = this.#workouts.find(
    work => work.id === workoutEl.dataset.id)
    console.log(workout)

    //drag the map obj around
    this.#map.setView(workout.coords, this.#mapZoomlevel,{
      animate:true,
      pan:{
        duration:1,
      }
    }) 
    
    //use public interface
    workout.click();  
  }
 //USE JSON.stringfy to convert any object to strings
  //with local storage API   we can store files, even if we refresh them it wont go out
    
_setLocalStorage() {
  localStorage.setItem('workouts', JSON.stringify(this.#workouts))
}

_getLocalStorage(){
//Json.parse converts strings back to an ARRAY

const data = JSON.parse(localStorage.getItem('workouts' /* => key */))
console.log(data)

//if there is no data return, check if data exist
if(!data) return;
this.#workouts = data;

this.#workouts.forEach(work => {
  this._renderWorkout(work);
});
}


reset(){
  //Delete data from local storage
  localStorage.removeItem('workouts')
  location.reload()
}
} 

//Edit workout, delete workouts, sort workouts by certain fied e.g distance
//error and confirmations messages


const app = new App() //no parameter in App class
//the app is created  in the begining when the page loads, and the 
//constructor also executes when the page loads

/*////////////////////////////*
APP is created with New App and stored into  const app /



/*Side not  When ever we convert object to string using Json.stringify and convert back to 
obj using Json.parse we will loose the prototype chain so the objects returned are just regular object, they cant inherite
from running or cycling reason why  we have "Uncaught TypeError: workout.click is not a function" its normally found in OPP and local storage */










 








