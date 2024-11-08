const express = require('express')
const movieRouter = require('./routes/movieRoutes')

const app = express()

app.use(express.json())
app.use('/movies',movieRouter)

app.get('/',(req,res)=>{
    res.send("Welcome to Movies")
})



app.listen(3000,()=>{
    console.log("Server started....")
})