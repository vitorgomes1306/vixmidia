import express from 'express';
import cors from 'cors'; // Importe o cors aqui
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';
import auth from './middlewares/auth.js';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const prisma = new PrismaClient(); // Não esqueça de instanciar o Prisma!

app.use(cors()); // <<< APLIQUE O CORS AQUI, ANTES DAS ROTAS
app.use(express.json()); // Também antes das rotas

// Suas rotas importadas — agora protegidas pelo CORS!
app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);
app.use(express.static('public'));

// Exemplo de rota adicional
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.user.findMany();
        res.status(200).json(usuarios);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});