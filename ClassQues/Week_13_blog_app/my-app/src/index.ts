import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app