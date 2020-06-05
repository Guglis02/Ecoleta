const express = require("express")
const server = express()

// Get data base
const db = require("./database/db")

// Enable req.body
server.use(express.urlencoded({ extended: true }))

// Public folder configs
server.use(express.static("public"))

// Template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Home page
server.get("/", (req, res) => {
    return res.render("index.html")
})

// Creation page
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) => {
    
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.render("create-point.html", { error: true })
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

// Search results page
server.get("/search", (req, res) => {

    const search = req.query.search

    // Empty search
    if(search == "") {
        return res.render("search-results.html", { total : 0})
    }

    function checkData(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length
        
        return res.render("search-results.html", {places : rows, total : total})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, checkData)

})

server.listen(3000)