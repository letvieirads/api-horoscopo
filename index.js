// index.js
const express = require('express');
const cors = require('cors'); // Importe o pacote CORS
const app = express();
const port = 3000;
// Habilite o CORS para todas as rotas
app.use(cors());
// Middleware para permitir JSON no corpo das requisições
app.use(express.json());
// Dados em memória (exemplo de signos na agenda)
let signos = [
  { id: 1, signo: "Áries", caracteristicas: "Impulsivo, corajoso, energético e independente.", periodo: "21/03 a 20/04" },
  { id: 2, signo: "Touro", caracteristicas: "Paciente, teimoso, pé no chão e busca estabilidade.", periodo: "21/04 a 20/05" },
  { id: 3, signo: "Gêmeos", caracteristicas: "Versátil, curioso, comunicativo e instável.", periodo: "21/05 a 20/06" },
  { id: 4, signo: "Câncer", caracteristicas: "Emocional, carinhoso, protetor e intuitivo.", periodo: "21/06 a 22/07" },
  { id: 5, signo: "Leão", caracteristicas: "Confiante, generoso, dramático e líder nato.", periodo: "23/07 a 22/08" },
  { id: 6, signo: "Virgem", caracteristicas: "Perfeccionista, crítico, prático e organizado.", periodo: "23/08 a 22/09" },
  { id: 7, signo: "Libra", caracteristicas: "Diplomático, charmoso, indeciso e busca harmonia.", periodo: "23/09 a 22/10" },
  { id: 8, signo: "Escorpião", caracteristicas: "Intenso, determinado, passional e misterioso.", periodo: "23/10 a 21/11" },
  { id: 9, signo: "Sagitário", caracteristicas: "Otimista, aventureiro, sincero e entusiasmado.", periodo: "22/11 a 21/12" },
  { id: 10, signo: "Capricórnio", caracteristicas: "Ambicioso, disciplinado, responsável e realista.", periodo: "22/12 a 20/01" },
  { id: 11, signo: "Aquário", caracteristicas: "Inovador, rebelde, amigo e focado no coletivo.", periodo: "21/01 a 18/02" },
  { id: 12, signo: "Peixes", caracteristicas: "Empático, sensível, sonhador e artístico.", periodo: "19/02 a 20/03" },
];
// Rota GET para obter um signo pelo ID
app.get('/signos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const signo = signos.find(c => c.id === id);
    if (signo) {
        res.json(signo);
    } else {
        res.status(404).json({ error: "signo não encontrado2" });
    }
});
// Rota GET para obter todos os signos
app.get('/signos', (req, res) => {
    res.json(signos);
});
// Rota POST para adicionar um novo signo
app.post('/signos', (req, res) => {
    const novoSigno = {
        id: signos.length + 1,
        signo: req.body.signo,
        caracteristicas: req.body.caracteristicas,
        periodo: req.body.periodo
    };
    signos.push(novoSigno);
    res.status(201).json(novoSigno);
});
// Rota PUT para atualizar um signo existente
app.put('/signos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const signo = signos.find(c => c.id === id);
    if (signo) {
        signo.signo = req.body.signo;
        signo.caracteristicas = req.body.caracteristicas;
        signo.periodo = req.body.periodo;
        res.json(signo);
    } else {
        res.status(404).json({ error: "Signo não encontrado" });
    }
});
// Rota PATCH para atualizar parcialmente
app.patch('/signos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const signo = signos.find(c => c.id === id);
    if (signo) {
        const { signo: nome, caracteristicas, periodo } = req.body;
        if (nome !== undefined) signo.signo = nome;
        if (caracteristicas !== undefined) {
            signo.caracteristicas = caracteristicas;
        }
        if (periodo !== undefined) signo.periodo = periodo;
        res.json(signo);
    } else {
        res.status(404).json({ error: "Signo não encontrado" });
    }
});
// Rota DELETE para excluir um signo
app.delete('/signos/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const index = signos.findIndex(c => c.id === id);
 if (index !== -1) {
    signos.splice(index, 1);
    res.status(204).send();
 } else {
    res.status(404).json({ error: "signo não encontrado" });
 }
});
// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});