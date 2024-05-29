const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

app.use(function (_req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(bodyParser.json());

const PUERTO = 4014;

const conexion = mysql.createConnection({
    host: 'dbsiap.mysql.database.azure.com',
    database: 'dbsiap',
    user: 'siapadmin',
    password: 'pollitos123456.', // Reemplaza con tu contraseña
    port: 3306, // El puerto por defecto de MySQL
});

// Intenta conectarse a la base de datos
conexion.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conectado a la base de datos de Azure');
    }
});

app.listen(PUERTO, () => {
    console.log('Servidor escuchando en el puerto:', PUERTO);
});

conexion.connect(error =>{
    if(error) throw error
    console.log('Conectado a la base de datos');
})

app.get('/tienda', (_req, res, next) =>{
    const query = 'SELECT * FROM tienda;'
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

app.get('/tiendaID/:id', (req, res, next) =>{
    const id = req.params.id;
    const query = 'SELECT * FROM tienda WHERE idTienda=?';
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

app.post('/tiendaAG', (req, res) => {
    const { nombre, direccion} = req.body;
    conexion.query("INSERT INTO tienda (nombre, direccion) VALUES (?,?)",
        [nombre, direccion],
        (err, result) => {
            if (err) {
                throw err;
            }
            console.log(req.body);
            res.status(201).json({ "Item añadido": result.affectedRows });
            return;
        });
});


app.delete('/tiendaEl/:id',(request,response)=>{
    const id=request.params.id;
    conexion.query("DELETE FROM tienda WHERE idTienda=?",
    [id],
    (error,results) =>{
        if(error)
        throw error;
    response.status(201).json({"item eliminado":results.affectedRows});
    });
});

app.put('/tiendaAc/:id',(req,_res)=>{
    const id = req.params.id;
    const {nombre,direccion} = req.body;
    const sql = "UPDATE tienda SET nombre = ?, direccion = ? WHERE idTienda = ?";
    conexion.query(sql,[nombre,direccion,id],
        (error,res)=>{
            if(error)
            throw error;
        _res.status(201).json({"Datos actualizados: ":res.affectedRows, "id:":id,})
        })
})

