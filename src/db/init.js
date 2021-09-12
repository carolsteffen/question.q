const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            pass TEXT
        )`);

    await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            room INT
        )`);

    await db.close();
  },
};

initDb.init();

//async - await - espera rodar o Database, e só vai executar o resto do código
// quando o resultado vai retornar
