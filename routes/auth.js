import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {findByUsername} from "../utils/db.js"

const router = express.Router();

router.post("/login", async (req, res) => {

    const {username, password} = req.body;
    if (!(username && password)) 
        return res.status(400).json({error:"Bad request."})
    const user = findByUsername(username);
    if (! user)
        return res.status(401).json({error: "User not found"});
    
    const {id, name, role, passwordHash} = user;
    const match = await bcrypt.compare(password, passwordHash);
    if (!match)
        return res.status(401).json({error: "Credentials not found"});
    
    const payload = {id, name, username, role};
    const secret = process.env.JWT_SECRET;
    const option = {expiresIn: "1h"};

    const token = jwt.sign(payload, secret, option);
    res.status(200).json({
        message:"Successfully logged in", 
        token,
    })
});


export default router;