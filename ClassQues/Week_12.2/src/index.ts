// interface User {
//     // id: string,
//     name: string,
//     age: number,
//     // email: string,
//     // password: string
// }
// type UpdateProp = Pick<User, 'name' | 'age' | 'email'>

// const user: Readonly<User> = {
//     name: 'bhalla ji',
//     age: 21
// }

//use of readonly
//Cannot assign to 'age' because it is a read-only property.ts(2540)
// (property) User.age: any
// user.age = 22;

// //now we see partial
// type UpdatePropOptional = Partial<UpdateProp>

// function updateUser(UpdateProps: UpdatePropOptional) {
//     console.log(`Name: ${UpdateProps.name}, Email: ${UpdateProps.email}`);
// }

//record and map
//how to give object types?
// type UserName = {
//     [key: string]: string
// }
//the above syntax can be written in record
// type Users = Record<string, { age: number, name: string }>
// const users = {
//     'bhalla1': {
//         id: '1',
//         username: 'bhalla Ji'
//     },
//     'gupta2': {
//         id: '2',
//         username: 'gupta Ji'
//     }
// }
// const user: Users = {
//     "bhalla1": { age: 23, name: "sanjog" },
//     "gupta2": { age: 25, name: "sejal" }
// }
//MAP this is a javascript concept
type User = {
    name: string,
    age: number
}
const users = new Map<string, User>();
users.set("bhalla1", { name: "sanjog", age: 23 });
users.set("gupta2", { name: "sejal", age: 25 })

const user = users.get("bhalla1");
console.log(user);

//Exclude 
type event = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<event, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
    console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK


// function sumOfAge(user1: User, user2: User) {
//     return user1.age + user2.age;
// }

// const age = sumOfAge({ name: "Bhalla Ji", age: 25 }, { name: "Gupta Ji", age: 23 });

// console.log(age);

//zod type inferance
import { z } from 'zod';
import express from "express";

const app = express();

// Define the schema for profile update
const userProfileSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email format" }),
    age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

type updateUserSchema = z.infer<typeof userProfileSchema>
app.put("/user", (req, res) => {
    const { success } = userProfileSchema.safeParse(req.body);
    const updateBody: updateUserSchema = req.body; // how to assign a type to updateBody?

    if (!success) {
        res.status(411).json({});
        return
    }
    // update database here
    res.json({
        message: "User updated"
    })
});

app.listen(3000);

