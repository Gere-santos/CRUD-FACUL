import {db} from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";
    db.query(q, (err, data)=>
    {
        if (err) return res.json(err);
        return res.status(200).json(data)
    });
};

export const addUser = (req, res) => {
 const q = "INSERT INTO usuarios(`nome`, `email`, `telefone`, `cidade`) VALUES(?)";
 const values =[
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.cidade
 ];

 db.query(q, [values], (err) => {
    if(err) return res.json(err);
    return res.status(200).json("Usuário criado com sucesso!");

 });
};
