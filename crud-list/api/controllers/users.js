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
 const q = "INSERT INTO usuarios(`nome`, `email`, `telefone`, `cidade`, `uf`) VALUES(?)";
 const values =[
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.cidade,
    req.body.uf
 ];

 db.query(q, [values], (err) => {
    if(err) return res.json(err);
    return res.status(200).json("Usuário criado com sucesso!");

 });
};

export const updateUser = (req, res) => {
    const q =  "UPDATE usuarios SET `nome` = ? , `email` = ?, `telefone` = ?, `cidade` = ?, `uf` = ? WHERE `id` = ?";
    const values =[
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.cidade,
        req.body.uf
    ];
    db.query(q, [...values, req.params.id], (err) =>{
        if(err) return res.json(err);
        return res.status(200).json("User atualizado com sucesso");
    });
};

export const getUser = (req, res) => {
    const userId = req.params.id; 
    const q = "SELECT * FROM usuarios WHERE id = ?"; 

    db.query(q, [userId], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("Usuário não encontrado");
        return res.status(200).json(data[0]); 
    });
};
export const deleteUser = (req, res) => {
    const userId = req.params.id;
    const q = "DELETE FROM usuarios WHERE id = ?";

    db.query(q, [userId], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("Usuário excluído com sucesso!");
    });
};  