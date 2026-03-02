const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());


app.post("/api/usuarios", async (req, res) => {
    try {
        const { nome, email, senha, perfil_nome } = req.body;

        const usuarioExiste = await prisma.usuario.findUnique({
            where: { email }
        });

        if (usuarioExiste) {
            return res.status(400).json({ erro: "Este email já está cadastrado." });
        }

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha,
                perfil: {
                    create: {
                        perfil_nome
                    }
                }
            },
            include: {
                perfil: true
            }
        });

        return res.status(201).json({
            mensagem: "Usuário e perfil cadastrados com sucesso!",
            usuario: novoUsuario
        });

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});

app.get("/api/usuarios", async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            include: {
                perfil: true
            }
        });

        return res.json({
            mensagem: "Usuários encontrados com sucesso",
            usuarios
        });

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});

app.put("/api/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: Number(id) },
            data: { nome, email, senha },
            include: { perfil: true }
        });

        return res.json({
            mensagem: "Usuário atualizado com sucesso",
            usuario: usuarioAtualizado
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        return res.status(500).json({ erro: error.message });
    }
});

app.delete("/api/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.usuario.delete({
            where: { id: Number(id) }
        });

        return res.json({ mensagem: "Usuário removido com sucesso" });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        return res.status(500).json({ erro: error.message });
    }
});

app.listen(3001, () => {
    console.log("Servidor rodando");
});