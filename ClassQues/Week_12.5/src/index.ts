import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function insertUser(username: string, password: string, firstName: string, lastName: string, email: string) {
//     const response = await prisma.user.create({
//         data: {
//             username,
//             password,
//             firstName,
//             lastName,
//             email
//         }
//     })
//     console.log(response);

// }
// insertUser("bhallaJi_16_2", "bhalla@12345", "bhalla2", "Ji2", "bhalla@162.com")


//update a database
// interface UpdateParams {
//     firstName: string,
//     lastName: string
// }
// async function updateUser(username: string, { firstName, lastName }: UpdateParams) {
//     const response = await prisma.user.update({
//         where: {
//             username
//         },
//         data: {
//             firstName,
//             lastName
//         }
//     })
//     console.log(response);

// }
// updateUser("bhallaJi_16", {
//     firstName: "Mrs",
//     lastName: "Gupta Ji"
// })


//Get all the data from the table
// async function getUser(username: string) {
//     const user = await prisma.user.findFirst({
//         where: {
//             username: username
//         }
//     })
//     console.log(user);
// }
// getUser("bhallaJi_16");


//create todo also
// async function createTodo(userId: number, title: string, description: string) {
//     const response = await prisma.todos.create({
//         data: {
//             userId,
//             title,
//             description
//         }
//     })
//     console.log(response);
// }

// createTodo(3, "go to play", "go to the playground and play football");

//get the data from todos
// async function getTodos(userId: number) {
//     const response = await prisma.todos.findFirst({
//         where: {
//             userId: userId
//         }
//     })
//     console.log(response);

// }
// getTodos(1);



//get the user details and the todo details
async function getTodosAndUserDetails(userId: number,) {
    const todos = await prisma.todos.findMany({
        where: {
            userId: userId,
        },
        select: {
            User: true,
            title: true,
            description: true
        }
    });
    console.log(todos);
}

getTodosAndUserDetails(1);