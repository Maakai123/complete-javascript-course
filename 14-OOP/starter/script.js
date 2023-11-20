'use strict';

const Person = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person.prototype.calAge = function(){
    console.log(2037 - this.birthYear)
};

const Student = function(firstName, birthYear, course){
    Person.call(this, firstName, birthYear) //call the parent 
    this.course = course
}

//linking prototypes 
Student.prototype = Object.create(Person.prototype)

Student.prototype.introduce = function(){
    console.log(`my name is ${this.firstName} and I study $
    {this,course}`)
}





const mike = new Student('mike', 2000, 'computer science')
console.log(mike)
mike.introduce()
mike.calAge()

console.log(mike.__proto__)

//coding Challenge 


const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
    
}

Car.prototype.accelerate = function(){
    this.speed += 10
}

Car.prototype.break = function(){
this.speed -= 10
}

//child 

const Ev = function(make, speed, charge ) {
   Car.call(this, make, speed) //call the parent 
   this.charge = charge;
}

Car.prototype.newModel = function(){
    console.log(`${this.make} has a new model tesla 192`)
}
//linking the prototypes, prototype of Ev to inherit from car parent
Ev.prototype = Object.create(Car.prototype)
Ev.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo
}

Ev.prototype.accelerate = function(){
    this.speed += 20;
    this.charge --;
    console.log(`${this.make} is going at ${this.speed}km/h with a charge of ${this.charge}`)
}


const tesla = new Ev('Tesla', 120, 23)
tesla.chargeBattery(89)
tesla.newModel()
console.log(tesla)

//class

class PersonCl {
    constructor(fullName,birthYear) {
this.fullName = fullName;
this.birthYear = birthYear;
}

calAge(){
    console.log(2037 - this.birthYear)
}
}

class StudentCl extends PersonCl{
    constructor(fullName, birthYear, course){
        //inherit from person
        super(fullName, birthYear)
            this.course = course
 }

 introduce(){
    console.log(`My name is ${this.fullName} and my course is ${this.course}`)
 }
}

const marta = new StudentCl('Marta', 2012, 'computer Science')
console.log(marta)

marta.introduce()
marta.calAge()


//Arch
class CarCl {
constructor(make, speed){
    this.make = make;
    this.speed = speed;
}

accelerate(){
    this.speed += 10
    console.log(`${this.make} is going at ${this.speed} km/h`);
}

break(){
this.speed -= 10
console.log(`${this.make} is going at ${this.speed} km/h`);
}

get speedUS(){
    return this.speed / 1.6
}

set speedUs(speed) {
this.speed = speed * 1.6
}

}
//inherite from  Carcl

class EVCL extends CarCl {
    #charge; //make charge private
//set this keyword with super
constructor(make, speed, charge){
super(make, speed)
  this.#charge = charge;
  
}

chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }

}


const rivian = new EVCL('rivian', 120, 23)
console.log(rivian)

// console.log(rivian.#charge); charge cant be accessed

//chaining
.accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();