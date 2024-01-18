const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Proyectosena"
});

app.post("/create", (req, res) => {
    const Nombre = req.body.Nombre; 
    const Ubicacion = req.body.Ubicacion;
    const Registro_propiedad = req.body.Registro_propiedad;

    db.query('INSERT INTO empresa (Nombre, Ubicacion, Registro_propiedad) VALUES (?, ?, ?)', [Nombre, Ubicacion, Registro_propiedad],
    (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});


app.put("/update", (req, res) => {
    const idEmpresa = req.body.idEmpresa; 
    const Nombre = req.body.Nombre; 
    const Ubicacion = req.body.Ubicacion;
    const Registro_propiedad = req.body.Registro_propiedad;

    db.query('UPDATE empresa SET Nombre = ?, Ubicacion = ?, Registro_propiedad = ? WHERE idEmpresa = ?', [Nombre, Ubicacion, Registro_propiedad, idEmpresa],
    (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});


app.get("/empresa", (req, res) => {
    

    db.query('SELECT * FROM empresa',
    (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

app.delete("/delete/:idEmpresa", (req, res) => {
    const idEmpresa = req.params.idEmpresa; 

    db.query('DELETE FROM empresa WHERE idEmpresa = ?',idEmpresa,
    (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});



app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})