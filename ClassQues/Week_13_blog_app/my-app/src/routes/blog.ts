import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

//these all routers need to be authenticated 
//extract the user Id
//pass it down the route handler
//check if the user has access and they are logged in or not
//if the above then get the userId and pass it to authorId: '1'
//we use set()/get()
blogRouter.use('/message/*', async (c, next) => {
    const authHeader = c.req.header("authentication") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
        c.set("userId", user.id);
        next();
    }
    else {
        c.status(403);
        return c.json({
            message: "You are not logged In"
        })
    }
})


//create a blog
blogRouter.post('/', async (c) => {
    //get the body first
    const body = await c.req.json();
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: '1' //this extraction will happen in the middleware
        }
    })
    return c.json({
        id: post.id
    });
})

//update a blog
blogRouter.put('/', async (c) => {
    //get the body first
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where: {
            id: body.authorId
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: post.id
    });
})

//get the blog
blogRouter.get('/', async (c) => {
    //get the body first
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const post = await prisma.post.findFirst({
            where: {
                id: body.authorId
            }
        })
        return c.json({
            post
        });
    } catch (error) {
        c.status(411);
        return c.text('Error while fetching the blog post')
    }
})

//get blog in bulk
//Add Pagination
blogRouter.get('/bulk', async (c) => {
    //get the body first
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    //find all
    const posts = await prisma.post.findMany({});
    return c.json({
        posts
    })
})

