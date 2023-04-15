class Person {
    debugger;
    constructor(name) {
      this.name = name;
    }
  
   introduce() {
      console.log(`Hello, my name is ${this.name}`);
    }
  }
  
  const firstName = new Person("Prajakta");
  
 // firstName.introduce(); // Hello, my name is Prajakta
  