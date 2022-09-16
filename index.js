const express = require('express')
const app = express()
const port = 3000
const moviesList = require('./examples/moviesList.json')
const log = require('console-log-level')({})

// parse the Json 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// get all the movies in list
app.get('/moviesList', (req, res) => {
    log.info('In Get All Movies List')
    res.status(200).json(moviesList)

})

// add movie to movies list
app.post('/addmovie', (req, res) => {
    log.info('Add Movie to Movies List')
    const movie = req.body
    log.info(movie)
    moviesList.push(movie)
    log.info("Movie Added to Movies List")
    res.send({ status: 200, message: "Movie is added to the list.", List: moviesList })
})

// get movie by id
app.get('/movie/:id', (req, res) => {
    const movieId = req.params.id
    const found = moviesList.find(movie => movie.id === movieId)
    if (found) {
        const movie = moviesList.filter(movie => {
            if (movie.id === movieId) {
                return movie
            }
        })
        res.send({ status: 200, message: "Got the Movie!", movie: movie })
    } else {
        res.send({ status: 404, message: "Movie Not Found!" })
    }
})

// update movie by id
app.put('/movie/:id', (req, res) => {
    const movieId = req.params.id
    const movieDetails = req.body
    const found = moviesList.find(movie => movie.id === movieId)
    if (found) {
        moviesList.forEach(movie => {
            if (movie.id === movieId) {
                movie.title = movieDetails.title ? movieDetails.title : movie.title
                movie.director = movieDetails.director ? movieDetails.director : movie.director
                movie.releaseDate = movieDetails.releaseDate ? movieDetails.releaseDate : movie.releaseDate
                return res.send({ status: 200, message: "Movie Updated Successfully", movie: movie })
            }
        });
    } else {
        res.send({ status: 404, message: "Movie not found!" })
    }
})

// delete movie by id
app.delete('/movie/:id', (req, res) => {
    const movieId = req.params.id
    const found = moviesList.find(movie => movie.id === movieId)
    if (found) {
        const movie = moviesList.filter(movie => {
            if (movie.id !== movieId) {
                return movie
            }
        })
        res.send({ status: 200, message: "Movie Deleted", movie: movie })
    } else {
        res.send({ status: 404, message: "Movie Not Found!" })
    }
})

// set server to listen at port
app.listen(port, () => log.info(`Server listening at port ${port}`))