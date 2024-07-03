import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    //because body will come out as a jason object
    //JWT authentication
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        })
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET)
        return c.json({ jwt })
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json({ error: "This User is already signed in" })
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        })
        if (!user) {
            c.status(403);//unauthorized
            return c.json({ message: "User does not exist" })
        }
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET)
        return c.json({ jwt })
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json({ error: "This User is already signed in" })
    }
})

