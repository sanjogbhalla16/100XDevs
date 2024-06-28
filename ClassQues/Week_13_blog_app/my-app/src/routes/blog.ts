import { Hono } from 'hono';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

blogRouter.get('/', (c) => {
    return c.text('id route');
})

blogRouter.post('/', (c) => {

    return c.text('signin route')
})

blogRouter.put('/', (c) => {
    return c.text('signin route')
})