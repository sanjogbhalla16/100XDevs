import { Hono, Next } from 'hono'
import { Context } from 'hono/jsx';

const app = new Hono()

function authMiddleware(c: any, next: any) {
  if (c.req.header("Authorization")) {
    // Do validation
    next()
  } else {
    return c.text("You dont have acces");
  }
};
app.use(authMiddleware)

app.get('/', async (c) => {
  const body = await c.req.parseBody()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.json({ msg: "as" })
})

export default app