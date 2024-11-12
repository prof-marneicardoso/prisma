import express, { json } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app  = express();
const port = 3000;
app.use(json());

app.post('/create-user', async (request, response) => {
    // const user = await prisma.user.create(request.body);
    const data = request.body;
    
    const user = await prisma.user.create({
        data: {
            email: data.email,
            nome: data.nome
        }
    });

    response.status(201).json("Usuário criado");  // Created
});

app.get('/', (request, response) => {
    response.send("Hello world, Express!!!");
});

app.get('/users', async (request, response) => {
    const users = await prisma.user.findUnique({
        where: {
            email: "prof.marneicardoso@gmail.com"
        }
    });

    response.status(200).json(users);  // OK
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});
