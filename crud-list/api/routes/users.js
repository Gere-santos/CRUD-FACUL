import express from "express";
import {getUsers, addUser, updateUser, getUser} from "../controllers/users.js";

const router = express.Router()


router.get("/", getUsers)
router.post("/", addUser)
router.put("/:id", updateUser)
router.get("/:id", getUser); 
/*
router.get("/:id", (req, res) => {
    const q = "SELECT * FROM usuarios WHERE id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data[0]); // Retorna o primeiro cliente encontrado
    });
});
*/
export default router

