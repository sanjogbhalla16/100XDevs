"use strict";
// interface User {
//     // id: string,
//     name: string,
//     age: number,
//     // email: string,
//     // password: string
// }
// type UpdateProp = Pick<User, 'name' | 'age' | 'email'>
const users = new Map();
users.set("bhalla1", { name: "sanjog", age: 23 });
users.set("gupta2", { name: "sejal", age: 25 });
const user = users.get("bhalla1");
console.log(user);
const handleEvent = (event) => {
    console.log(`Handling event: ${event}`);
};
handleEvent('click'); // OK
// function sumOfAge(user1: User, user2: User) {
//     return user1.age + user2.age;
// }
// const age = sumOfAge({ name: "Bhalla Ji", age: 25 }, { name: "Gupta Ji", age: 23 });
// console.log(age);
