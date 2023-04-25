console.log('classConst loaded')

class Person {
    constructor() {
      this.name = 'Prajakta';
    }
    introduce(){
         let fullName = `my name is ${name}`
         return fullName;
      }
  }
  
  const firstName = new Person();
  let Name = firstName.introduce();
  console.log(Name)

 