const express = require("express")
const server = express()

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
    res.render("index.html")
})

// Creation page
server.get("/create-point", (req, res) => {
    res.render("create-point.html")
})

// Search results page
server.get("/search", (req, res) => {
    res.render("search-results.html")
})

server.listen(3000)