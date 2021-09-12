//importando o módulo express
const express = require("express");

//chamando o arquivo das rotas
const route = require("./route");
const path = require("path");
const { publicDecrypt } = require("crypto");

const server = express();
//iniciando e chamando o express por meio da const

server.use(express.static("public"));

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
//informando o caminho do projeto

server.use(express.urlencoded({ extended: true }));

//usando as rotas
server.use(route);

server.listen(5000, () => console.log("Rodando"));
//passar uma porta para ele ficar escutando
