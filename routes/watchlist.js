import express from "express";
import {getWatchlist, addMovie, updateMovie, deleteMovie} from "../utils/db.js"
import {authorizeModification} from "../middleware/authorize.js"

const router = express.Router();

router.get("/:userId", (req, res) => {
    const {userId} = req.params;
    const watchList = getWatchlist(Number(userId));
    res.status(200).json(watchList);
});

router.post("/:userId/movies", authorizeModification, (req, res) => {
    const {userId} = req.params;
    const movie = req.body;
    addMovie(Number(userId),movie);
    res.status(201).json({message:`movie added`});
});

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const {userId, movieId} = req.params;
    const updates = req.body;
    updateMovie(Number(userId),Number(movieId), updates);
    res.status(200).json({message:`movie updated`});
});

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const {userId, movieId} = req.params;
    deleteMovie(Number(userId),Number(movieId));
    res.status(200).json({message:`movie deleted`});
});



export default router;