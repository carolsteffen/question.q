const express = require("express");

const route = express.Router();

const QuestionController = require("./controllers/QuestionController");

const RoomController = require("./controllers/RoomController");

route.get("/", (request, response) =>
  response.render("index", { page: "enter-room" })
);
route.get("/create-pass", (request, response) =>
  response.render("index", { page: "create-pass" })
);

route.post("/create-room", RoomController.create);
route.get("/room/:room", RoomController.open);
route.post("/enter-room", RoomController.enter);

//Formato que o form dentro da modal tem que passar a info
// route.post(
//   "/room/:room/:question:action",
//   (request, response) => response.render
// );
//: é usado para receber o conteúdo de uma variável na url, e é chamado de path/url param
route.post("/question/create/:room", QuestionController.create);
route.post("/question/:room/:question/:action", QuestionController.index);

module.exports = route;
//exportando route para ser usado no server
