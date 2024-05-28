const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const { error } = require("console");
const jwt = require('jsonwebtoken');
const app = express();

app.use(function (_req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(bodyParser.json());
const PUERTO = 4020;

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'siap',
    user: 'root',
    password: ''
});

app.listen(PUERTO, () => {
    console.log('Puerto:', PUERTO);
});

conexion.connect(error =>{
    if(error) throw error
    console.log('Conectado a la base de datos');
})

app.get('/persona', (_req, res, next) =>{
    const query = 'SELECT * FROM persona;'
    conexion.query(query, (error, resultado) =>{
        if(error) {
            return next(error); 
        }
        
        if(resultado.length > 0) { 
            res.json(resultado);
        } else {
            res.status(404).json({ error: 'No hay registros' }); 
        }
    });
});

app.get('/personaID/:id', (req, res, next) =>{
    const id = req.params.id;
    const query = 'SELECT * FROM persona WHERE idPersona=?';
    conexion.query(query, [id], (error, resultado) =>{
        if(error) {
            return next(error); 
        }
        
        if(resultado.length > 0) { 
            res.json(resultado);
        } else {
            res.status(404).json({ error: 'No hay registros de id' }); 
        }
    });
});

app.post('/personaAG', (req, res) => {
    const { Nombre1,Nombre2,Apellido1,Apellido2,fechaNacimiento,Telefono,CorreoElectronico,Contrasena,DireccionResidencia,NumeroDocumentoIdentidad,tipoDocumento_idtipoDocumento,Rol_idRol} = req.body;
    conexion.query("INSERT INTO persona (Nombre1,Nombre2,Apellido1,Apellido2,fechaNacimiento,Telefono,CorreoElectronico,Contrasena,DireccionResidencia,NumeroDocumentoIdentidad,tipoDocumento_idtipoDocumento,Rol_idRol) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [Nombre1,Nombre2,Apellido1,Apellido2,fechaNacimiento,Telefono,CorreoElectronico,Contrasena,DireccionResidencia,NumeroDocumentoIdentidad,tipoDocumento_idtipoDocumento,Rol_idRol],
        (err, result) => {
            if (err) {
                throw err;
            }
            console.log(req.body);
            res.status(201).json({ "Item añadido": result.affectedRows });
            return;
        });
});


app.delete('/personaEl/:id',(request,response)=>{
    const id=request.params.id;
    conexion.query("Delete from persona where idPersona=?",
    [id],
    (error,results) =>{
        if(error)
        throw error;
    response.status(201).json({"item eliminado":results.affectedRows});
    });
});

app.put('/personaAc/:id',(req,_res)=>{
    const id = req.params.id;
    const {Nombre1,Nombre2,Apellido1,Apellido2,fechaNacimiento,Telefono,CorreoElectronico,Contrasena,DireccionResidencia,NumeroDocumentoIdentidad} = req.body;
    const sql = "update persona set Nombre1 = ?, Nombre2 = ?, Apellido1 = ?, Apellido2 = ?,fechaNacimiento=?,Telefono=?,CorreoElectronico=?,Contrasena=?,DireccionResidencia=?,NumeroDocumentoIdentidad=? where idPersona = ?";
    conexion.query(sql,[Nombre1,Nombre2,Apellido1,Apellido2,fechaNacimiento,Telefono,CorreoElectronico,Contrasena,DireccionResidencia,NumeroDocumentoIdentidad,id],
        (error,res)=>{
            if(error)
            throw error;
        _res.status(201).json({"Datos actualizados: ":res.affectedRows, "id:":id,})
        })
})

module.exports = conexion;