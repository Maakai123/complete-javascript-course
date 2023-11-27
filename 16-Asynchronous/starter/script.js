'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
 
///////////////////////////////////////
/*
// old method 
const contriesData = function(country) {
const request = new XMLHttpRequest();
//recieve
request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
request.send()  //https://restcountries.com/v3.1/name/{name} string
//request.send() sends the request, 
request.addEventListener('load',function(){
    //console.log(this.responseText) //responseText Javascript string

    //to get specific items from the array of objects, like array[2]
    // convert string to  objects, 
    //this = request => request.responseText
    const [data] = JSON.parse(this.responseText)
    console.log(data)
    const html = ` 
    <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.altSpellings[0]}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.capital}</p>
      <p class="country__row"><span>💰</span>${data.region}</p>
    </div>`

countriesContainer.insertAdjacentHTML('beforeend',html)
countriesContainer.style.opacity = 1
})
 
}
 
contriesData('nigeria')
contriesData('portugal')
contriesData('france')

*/

const renderCountry = function(data, className = '') {
  const html = ` 
      <article class="country  ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.altSpellings[0]}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.capital}</p>
        <p class="country__row"><span>💰</span>${data.region}</p>
      </div>`
  
  countriesContainer.insertAdjacentHTML('beforeend',html)
  countriesContainer.style.opacity = 1
}

const renderError = function(msg){
  countriesContainer.insertAdjacentText('afterend',msg)
  countriesContainer.style.opacity = 1
}
/*

const getContriesAndNeigbor = function(country) {

  //Ajax call country

  const request = new XMLHttpRequest();
  //recieve
  request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
  request.send()  //https://restcountries.com/v3.1/name/{name} string
  //request.send() sends the request, 

  request.addEventListener('load',function(){
      //console.log(this.responseText) //responseText Javascript string
  
      //to get specific items from the array of objects, like array[2]
      // convert string to  objects, 
      //this = request
      const [data] = JSON.parse(/this.responseText)
      console.log(data)

      //Render country
      renderCountry(data)

      //Get neignbour country (2)
      const [neighbour] = borders

      //if neigbour does not exits return

      if(!neighbour) return;


      //Ajax call country 2


    const request2 = new XMLHttpRequest();
  
  request2.open('GET',`https://restcountries.com/v3.1/alpha/${neignbour}`);
  request2.send() 

request2.addEventListener('load', function(){
  const data2 = JSON.parse(this.responseText);
  console.log(data2)
  renderCountry(data2, 'neighbour')
})
       
  })
   
  }
   
  getContriesAndNeigbor('nigeria')


/*NOTE
CALL BACK HELL: When call backs are placed in call backs in other to perform
Asynchronouse sequence, call back hell makes our code difficult to maintain, promises is the onlyway we can excape call back hell 

PROMISES 

OLD WAY TO GET DATA
request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
request.send()  //https://restcountries.com/v3.1/name/{name} string
//request.send() 




 const request = fetch('https://restcountries.com/v3.1/name/portugal');
 console.log(request) //promise is stored inside and returned
 

 const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if(!response.ok) throw new Error(`${errorMsg} (${response.status})`)

    return response.json()
  })
 }
 
 

 const getContries = function(country){
  getJSON(`https://restcountries.com/v3.1/name/${country}`,
  'Country not found')

   //this will go down to the catch error handler;
  .then(data =>  { 
    renderCountry(data[0])
    console.log(data[0])

  const neighbour1 = data[0].borders[1];

  //if neigbbours dont exist
  if(!neighbour1) throw new Error('No neighbour found')

  //country2
return getJSON(`https://restcountries.com/v3.1/name/${neighbour1}
`,'Country not found')

})     
.then(data => renderCountry(data, 'neighbour1'))

  // or use catch method, error is a js object
 .catch(err => {
  console.error(`${err}💥`)
  renderError(`something went wrong 💥 ${err.message
  }, Try again`)
})

  //catch itself also return a promise;
.finally(() => {
  countriesContainer.style.opacity =1
})
}
 

btn.addEventListener( 'click',function(){
  getContries('france')
  
})




  
  fetch(`https://restcountries.com/v3.1/name/${country}`, 
  'Country not found')
  .then(function(response){
    console.log(response)
    return response.json()
  })
  .then(function(data) {
     console.log(data)
  
     renderCountry(data[0])
  })
  
}

//getContries('portugal')


  
   



 /*

 refer back 
 const getContries = function(country){
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(function(response){
    console.log(response)
    return response.json()
  })
  .then(function(data) {
     console.log(data)

     renderCountry(data[0])
  })
  
}

//getContries('portugal')


//Method
const getContries2 = function(country){
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(response => {
    console.log(response)
 //if response is not false
     if(!response.ok)
     throw new Error(`Country not found  (${response.status})`)
    return  response.json()
  })
    
   //this will go down to the catch error handler;
  .then(data =>  { 
    renderCountry(data[0])
    console.log(data[0])

  const neighbour1 = data[0].borders[1];

  //if neigbbours dont exist
  if(!neighbour1) return;

  //country2
return fetch(`https://restcountries.com/v3.1/name/${neighbour1}`)

})     
.then(response => response.json())
.then(data => renderCountry(data, 'neighbour1'))

  // or use catch method, error is a js object
 .catch(err => {
  console.error(`${err}💥`)
  renderError(`something went wrong 💥 ${err.message
  }, Try again`)
})

  //catch itself also return a promise;
.finally(() => {
  countriesContainer.style.opacity =1
})
}
 

btn.addEventListener( 'click',function(){
  getContries2('france')
  
})
*/






//coding challenge 

/*
const whereAmI = function(lat, lng) {
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=0456a8aaf0e04160a0ef70a45a1e19f1`)
  .then(response => {
    //ok is always true, but if ok is false if there is a problem
    //console.log(response)
    if(!response.ok) throw new Error(`Problem with geocode ${response.status}`)
    return response.json()
  }) //get response 
  .then(data => {
    console.log(data)
    console.log(`you are in  ${data.results[0].city}, ${data.results[0].country}`)
   
    //get country 
    return fetch(`https://restcountries.com/v3.1/name/${data.results[0].country}`)
  })
  //add then(response => to handle the new promise)
  .then(response => {
    if(!response.ok) throw new Error(`Country not found(${response.status})`)

    return response.json()
  })

  .then(data => renderCountry(data[0]))
  //add catch method 
  .catch(error => console.error(`${error.message}`))
}

whereAmI(52.508,13.381)
whereAmI(19.037,72.873)
whereAmI(-33.933,18.474)

*/
//create a promise 

const lotteryPromise = new Promise(function(resolve, reject){
 /* if(Math.random() >= 0.5){ //0 and 1
    resolve('you win') //response
  }else{
    reject('You lost your money') //error
  }
*/
console.log('Lottery has started')
  setTimeout(function(){
    if(Math.random() >= 0.5){ //0 and 1
      resolve('you win') //response
    }else{
      reject('You lost your money') //error
    }
  }, 2000) //2 secs
});

lotteryPromise.then(res => console.log(res))
.catch(err => console.error(err))



//Promisfying SetTimeout

/*
 const wait = function(seconds) {
  return new Promise(function(resolve){ //return a new promise
    setTimeout(resolve, seconds *1000) //run aft 1sec
    
  })
 }

 wait(1) //this wait function will create a promise that will wait for 1second before reolving
 .then(() => {
  console.log('I waited for 1 seconds')
  return wait(1)
 })

 .then(() => {
  console.log('I waited for 2 seconds')
  return wait(1)
 })

 .then(() => {
  console.log('I waited for 3 seconds')
  return wait(1)
 })


 .then(() => console.log('I waited for 4 seconds'))


 Promise.resolve('abc').then(x => console.log(x)) //resolve a static method on the promise
 Promise.reject(new Error('Problem!')).catch(x => console.log(x))
 //use catch and not then because it wont resolve a promise

 //Promisifying the geolocation 
*/


 //const getPosition = function(){
 // return new Promise( function (resolve, reject){
   /* navigator.geolocation.getCurrentPosition(
      position => resolve(position),    //position is success we need to resolve it
     err => reject(err))
      */
     //simplify it 
   
   //  navigator.geolocation.getCurrentPosition(resolve,
    //  reject);

  //})
  
 //}

 
 //call the position function with then method to get the promise

 //getPosition().then(position => console.log(position))

 //const whereAmI = function(lat, lng) 
 //since we have position coordinate remove lat and lng,
 //use geolocation

 const whereAmI = function() {
//call get position function
getPosition().then(position => {
  //console.log(position.coords)
  //destructure 

  const {latitude: lat, longitude:lng} = position.coords;
  //return a new promsie
   return  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=0456a8aaf0e04160a0ef70a45a1e19f1`)
  })
//handle the new promise with then() method

  .then(response => {
    //ok is always true, but if ok is false if there is a problem
    //console.log(response)
    if(!response.ok) throw new Error(`Problem with geocode ${response.status}`)
    return response.json()
  }) //get response 
  .then(data => {
    console.log(data)
    console.log(`you are in  ${data.results[0].city}, ${data.results[0].country}`)
   
    //get country 
    return fetch(`https://restcountries.com/v3.1/name/${data.results[0].country}`)
  })
  //add then(response => to handle the new promise)
  .then(response => {
    if(!response.ok) throw new Error(`Country not found(${response.status})`)

    return response.json()
  })

  .then(data => renderCountry(data[0]))
  //add catch method 
  .catch(error => console.error(`${error.message}`))
}
btn.addEventListener('click', whereAmI ) // call the function when click on btn






//coding challenge two


/*
const wait = function(seconds) {
  return new Promise(function(resolve){ //return a new promise
    setTimeout(resolve, seconds *1000) //run aft 1sec
    
  })
 }


 const imgContainer = document.querySelector('.images');
const createImage = function(imgPath){
  //always return new promise when promisfying 
  return new Promise(function(resolve, reject){ //sucess and error
  const img = document.createElement('img');
  img.src = imgPath;

  //load the image and listen
  img.addEventListener('load', function(){
    //append img or add
    imgContainer.append(img);
    //since it was loading it returns a promise
    resolve(img) //success of the image
  })
   
  //reject error of the image
  img.addEventListener('error', function(){
    reject(new Error('Image not found'))
  });
  });
}

//handle success with then
let currentImg //so all the images can access

createImage('img/img-1.jpg') //return a promise, use then to resolve it
.then(img => {
  currentImg = img;
  console.log('Image 1 loaded')
  return wait(2) //show after 2 secs
})
.then(() => {
  currentImg.style.display = 'none';
  return createImage('img/img-2.jpg'); //return new promise
})

//handle/recieve  the new promise/img  with then()
.then(img => {
  currentImg = img;
  console.log('image 2 loaded')
  return wait(2)
})
.then(()=> {
  currentImg.style.display = 'none';
})

.catch(err => console.error(err))

*/

/////////////////////////////////////////////
/*consuming Promise with Async/Await  Es2017*/
/////////////////////////////////////////////



const getPosition = function(){
  return new Promise( function (resolve, reject){
   /* navigator.geolocation.getCurrentPosition(
      position => resolve(position),    //position is success we need to resolve it
     err => reject(err))
      */
     //simplify it 
   
   navigator.geolocation.getCurrentPosition(resolve,
     reject);

 })
  
}


const myLocation = async function() { 
  /*fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(res => console.log(res))
  the same as below
  */

//try block 

try {

  //Geolocation
 const position = await getPosition()
  const {latitude: lat, longitude:lng} = position.coords;
  


  //Reverse geocodeing

   const revGeo = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=0456a8aaf0e04160a0ef70a45a1e19f1`)
   //get the Json

   //create an Error from api
   if(!revGeo.ok) throw new Error('problem getting location data')


   const dataGeo = await revGeo.json()

   console.log(dataGeo)
  
const response = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.results[0].country}`)
//await until the value of fetch or promise is returned

if(!revGeo.ok) throw new Error('problem getting location data') //error message
 
// return the json file

const data = await response.json();
console.log(data)
renderCountry(data[0])
console.log(response)

//catch block, this block will catch all errors

} catch(err){
console.error(err);
renderError(`${err.message}`)
}



}

//myLocation() //this will get my position without pasing in the country
//console.log('First') 

//return data from async functions

console.log('1: Will get location');
(async   function (){
  try {
   const city = await myLocation()
   console.log(`2: ${city}`)
  } catch(err){
    console.error(`2: ${err.message}`)
  }
  console.log(`3: Finished getting location`)
})()

//try catch errors

/*
try{
  let y =1 ;
  const x = 3
  x = 3
} catch(err){
  alert(err.message)
}
*/  



/////////////////////////////////////////////
/*Running Promises in parallel */
/////////////////////////////////////////////

const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if(!response.ok) throw new Error(`${errorMsg} (${response.status})`)

    return response.json()
  })
 }


const get3Countries = async function(c1,c2,c3) {
  try {
//Array, destructure
/*
 const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`)
 const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`)
 const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`)
 */

 //run all the codes at the same time
 const data = await Promise.all([getJSON(`https://restcountries.com/v3.1/name/${c1}`),
 getJSON(`https://restcountries.com/v3.1/name/${c2}`),
 getJSON(`https://restcountries.com/v3.1/name/${c3}`),
  ]) //takes in array of promises and run them at the same, 
  console.log(data)
  console.log(data.map(d => d[0].capital[0]))
 //return array of capital of cities, since an arraya will return
  } catch(error){
   console.log(error)
  }
}

//get3Countries('portugal', 'canada', 'tanzania')

//when working on multiple Async operations at the same time use parall





/////////////////////////////////////////////
/*Promise combinators: Race Allsettled and Any*/
///////////////////////////////////////////// 


//promise.race : This recieves an Array of promises ans also return the promise
//The first settle promise wins the race, the fasted of the all promises wins it at the end 
//only one value will show even its rejected or successful.

 const race =  async function( a,b, c){
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/${a}`),
    getJSON(`https://restcountries.com/v3.1/name/${b}`),
    getJSON(`https://restcountries.com/v3.1/name/${c}`),
  ])

  console.log(res[0])
 }
  
  race('ghana', 'japan', 'france')


//Reject Request that takes so long 

const timeout = function(sec) {
return new Promise(function(_, reject){
  setTimeout(function(){
    reject(new Error('Request took too long!'));
  }, sec* 1000)
});
};

//Promise combinator
//important
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(5)
])
 .then(res => console.log(res[0]))
 .catch(err => console.error(err))


 //Promsise.allSettle Es62021

 Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success')
 ])
 .then(res => console.log(res))


//Promise.all  important onence

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success')
 ])
 .then(res => console.log(res))
 .catch(err => console.error(err))

 //Promise.any
 //This will return the first fulfil promise and ignore the rejected promise, just like race but ignores
 //reject, this will always be a fulfil 
 Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success')
 ])
 .then(res => console.log(res))
 .catch(err => console.error(err))


 //coding challenge 3

 const imgContainer = document.querySelector('.images');

 const wait = function(seconds) {
  return new Promise(function(resolve,){ //return a new promise
    setTimeout(resolve, seconds *1000) //run aft 1sec
    
  })
 }





const createImage = function(imgPath){
  //always return new promise when promisfying 
  return new Promise(function(resolve, reject){ //sucess and error
  const img = document.createElement('img');
  img.src = imgPath;

  //load the image and listen
  img.addEventListener('load', function(){
    //append img or add
    imgContainer.append(img);
    //since it was loading it returns a promise
    resolve(img) //success of the image
  })
   
  //reject error of the image
  img.addEventListener('error', function(){
    reject(new Error('Image not found'))
  });
  });
}

//handle success with then


const loadNPause = async  function(){
  try{
//await the promise, load img 1 
let   img = await createImage('img/img-1.jpg');
console.log('Image 1 loaded')
 await wait(2) // wait f 2 milli seconds
img.style.display = "none"; // we are in the same scope, they can be reassigned easily


img = await createImage('img/img-2.jpg');
console.log('Image 2 loaded')
 await wait(2) // wait f 2 milli seconds
img.style.display = "none";
  }catch(err) {
    console.log(err);
  }
}

loadNPause()

 

//Part 2

const loadAll = async function(imgArr){
  try{
   const imgs = imgArr.map(async img => await //await pauses the execution of the function in the loop
    createImage(img)) //image is async return promise,and load the img with createImg
    console.log(imgs)

    //get all the images out of the promise 
//when working aync await in a map, an array of promises will return which can be
//handle with promise.all

  const imgsEL = await Promise.all(imgs)
  console.log(imgsEL)
  //loop
  imgsEL.forEach(img => img.classList.add('parallel'))
    
  }catch(err){
    console.log(err)
  }
}

loadAll(['img/img-1.jpg'], 'img/img-2.jpg','img/img-3.jpg')