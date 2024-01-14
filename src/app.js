const express = require('express')
const path = require("path")
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000;

// STATIC PATHS
const staticPath = path.join(__dirname, '../public')
const templatePaths = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set("views", templatePaths)
hbs.registerPartials(partialsPaths)

app.use(express.static(staticPath))


// ROUTING
app.get("/", (req, res) => {
    res.render('index.hbs')
})


app.get("*", (req, res) => {
    res.render('404error.hbs')
})

app.listen(port, () => {
    console.log("server running at port 3000")
})