require("dotenv").config();

const PORT = process.env.PORT;

const client = require("../redis/redisClient");
const app = require("./app");
app.listen(PORT, async () => {
  await client.connect();
  console.log(`Servidor rodando na porta ${PORT}...`);
});
