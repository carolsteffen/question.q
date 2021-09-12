const { open } = require("sqlite");
const Database = require("../db/config");

module.exports = {
  async create(request, response) {
    const db = await Database();
    let roomId;
    const pass = request.body.password;
    let isRoom = true;

    while (isRoom) {
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString());
      }

      //Verificar se número da sala

      const roomsExistIds = await db.all(`SELECT id FROM rooms`);

      //verificando se existe a sala igual ou não
      isRoom = roomsExistIds.some((roomsExistIds) => roomsExistIds === roomId);

      //senão existir, insere na tabela
      if (!isRoom) {
        //Insere a sala no banco
        await db.run(`INSERT INTO rooms (
      id,
      pass
    ) VALUES(
      ${parseInt(roomId)},
      ${pass}
    )`);
      }
    }

    db.close();

    response.redirect(`/room/${roomId}`);
  },

  async open(request, response) {
    const db = await Database();
    const roomId = request.params.room;
    let isNoQuestions;

    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
    );

    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE ${roomId} and read = 1`
    );

    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isNoQuestions = true;
      }
    }

    response.render("room", {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions,
    });
  },

  enter(request, response) {
    const roomId = request.body.roomId;
    response.redirect(`/room/${roomId}`);
  },
};
