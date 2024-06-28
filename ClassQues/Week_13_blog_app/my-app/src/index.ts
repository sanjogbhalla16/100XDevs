import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>();

app.post('/api/v1/signup', async (c) => {
  //because body will come out as a jason object
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    })
    return c.text("Signed Up!!!!")
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.text("This User is already signed in")
  }
})

app.post('/api/v1/signin', (c) => {
  return c.text('signin route')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('id route');
})

app.post('/api/v1/blog', (c) => {

  return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
  return c.text('signin route')
})

export default app;
