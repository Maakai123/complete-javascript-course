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
      const [data] = JSON.parse(/*request*/ this.responseText)
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

*/


 const request = fetch('https://restcountries.com/v3.1/name/portugal');
 console.log(request)
 





