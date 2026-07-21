import createApp from "./app";

const app = createApp();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
