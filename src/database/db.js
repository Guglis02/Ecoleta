const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

db.serialize(() => {

// Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

// Inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
        "https://www.celuloseonline.com.br/wp-content/uploads/2016/08/Reciclagem-de-papel-apara-papel-papel%C3%A3o.jpg",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    // db.run(query, values, afterInsertData)

// Deletar dados na tabela

    function afterDeleteData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso!")
    }

    // db.run(`DELETE FROM places WHERE id = ?`, [1], afterDeleteData)

    
// Consultar dados na tabela

    function checkData(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros")
        console.log(rows)
    }

    //db.all(`SELECT * FROM places`, checkData)

})