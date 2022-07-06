require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDataBase = require("./database/database")

const port = process.env.PORT || 3001;
const app = express();

connectDataBase();
app.use(cors());


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
