class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor (carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo (){
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h ${this.isTrunkOpen}`)
  }

  go (){
    if (this.isTrunkOpen === false) {
       if (this.speed + 5 <= 200) {
      this.speed += 5
     }
    }
  }

  brake (){
    if ((this.speed - 5 >= 0)) {
      this.speed -=5
    }
  }

  openTrunk(){
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    } 
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }
}



class RaceCar extends Car {
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go(){
    if (this.speed + this.acceleration <= 300) {
      this.speed += this.acceleration
     }
  }

  openTrunk(){
    console.log('Does not have a trunk');
  }

  closeTrunk(){
    console.log('Does not have a trunk');
  }
}


const car = new Car ({brand: 'Toyota', model: 'Lexus'});
const car2 = new Car ({brand: 'Mercedes', model: 'Maybach'});
const car3 = new RaceCar ({brand: 'McLaren', model: 'F1', acceleration: 20})


car.displayInfo();
car2.displayInfo();
car3.go();
car3.openTrunk();
car3.displayInfo();


