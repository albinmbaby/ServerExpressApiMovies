const express = require('express')
const router = express.Router()
const movies = require('../movies')


// /movies
router.get('/',(req,res)=>{
    try {
        res.status(200).json(movies)
    } catch (error) {
       res.status(404).json({error:error.message}) 
    }
})

// get movie by id
router.get('/:id',(req,res)=>{
    try {
        const movieID = parseInt(req.params.id)
        const movie = movies.find(mov=>mov.id===movieID)
        if(!movie)res.status(404).json({error:"Movie not Found"})
        res.status(200).json(movie)    
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

// post- creat movie
router.post('/',(req,res)=>{
    try {
        if(!req.body) res.status(200).json({message:"Movie title,genre, releaseYear, and rating are required"})
        const {title,genre,releaseYear,rating} = req.body
        const newMovie = {
            id:movies.length?movies[movies.length-1].id +1:1,
            title:title,
            genre:genre,
            releaseYear:releaseYear,
            rating:rating
        }  
        movies.push(newMovie)
        res.status(201).json({message:"Movie Added",movie:newMovie}) 
    } catch (error) {
       res.status(404).json({error:error.message}) 
    }
})

// Update Movie rating
router.patch('/:id',(req,res)=>{
    try {
        const movieID = parseInt(req.params.id)
        const movie = movies.find(mov=>mov.id===movieID)
        if(!movie)res.status(404).json({error:"Movie not Found"})
        const {rating} = req.body
        if(rating) movie.rating = rating
        res.status(200).json(movie)   
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

//Delete Movie details
router.delete('/:id',(req,res)=>{
    try {
        const movieID = parseInt(req.params.id)
        const movieIndex = movies.findIndex(mov=>mov.
        id===movieID)
        if(movieIndex == -1) return res.status(404).json
        ({error:"Movie not found"})
        const deletedMovie= movies.splice(movieIndex,1)
        res.status(200).json({message:"Movie deleted",
        movie:deletedMovie})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})


module.exports = router