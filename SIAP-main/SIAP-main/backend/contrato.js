const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

// Configuración de CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Manejo de la solicitud preflight
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});
app.use(bodyParser.json());

const PUERTO = process.env.PORT || 4006; // Usar el puerto del entorno si está disponible

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'siap',
    user: 'root',
    password: '04120413', // Reemplaza con tu contraseña
    port: 3306, // El puerto por defecto de MySQL
});

conexion.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conectado a la base de datos de Azure');
    }
});

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
});

app.get('/contrato', (_req, res, next) =>{
    const query = 'SELECT * FROM contrato;'
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

app.get('/contratoID/:id', (req, res, next) =>{
    const id = req.params.id;
    const query = 'SELECT * FROM contrato WHERE idContrato=?';
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

app.post('/contratoAG', (req, res) => {
    const { Salario,FechaInicioContrato,FechaFinalContrato,tipoContrato_idtipoContrato,Persona_idPersona} = req.body;
    conexion.query("INSERT INTO contrato (Salario,FechaInicioContrato,FechaFinalContrato,tipoContrato_idtipoContrato,Persona_idPersona) VALUES (?,?,?,?,?)",
        [Salario,FechaInicioContrato,FechaFinalContrato,tipoContrato_idtipoContrato,Persona_idPersona],
        (err, result) => {
            if (err) {
                throw err;
            }
            console.log(req.body);
            res.status(201).json({ "Item añadido": result.affectedRows });
            return;
        });
});


app.delete('/contratoEl/:id',(request,response)=>{
    const id=request.params.id;
    conexion.query("DELETE FROM contrato WHERE idContrato=?",
    [id],
    (error,results) =>{
        if(error)
        throw error;
    response.status(201).json({"item eliminado":results.affectedRows});
    });
});

app.put('/contratoAc/:id',(req,_res)=>{
    const id = req.params.id;
    const {Salario,FechaInicioContrato,FechaFinalContrato} = req.body;
    const sql = "UPDATE contrato SET Salario = ?, FechaInicioContrato = ?, FechaFinalContrato = ? WHERE idContrato = ?";
    conexion.query(sql,[Salario,FechaInicioContrato,FechaFinalContrato,id],
        (error,res)=>{
            if(error)
            throw error;
        _res.status(201).json({"Datos actualizados: ":res.affectedRows, "id:":id,})
        })
})