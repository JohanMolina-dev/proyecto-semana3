//importacion de express
const express = require('express');
//importacion de morgan
const morgan = require('morgan');
const apiRouter =require('./routes/index')
const bodyPArser = require('body-parser');
//llamado de express desde la app
const app = express();
const cors = require('cors');
app.use(cors())

app.use ((req,res, next)=>{
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.header("Access-Control-Allow-Methods: GET, POST, DELETE");
next()
});
// uso de morgan bajo dev, middleware para detectar peticiones
app.use(morgan('dev'));
app.use(bodyPArser.json());
app.use(bodyPArser.urlencoded({ extended: true }));

//manejador de ruta, va siempre con request y response
//Metodo que llama a la ruta (funcion anonima va en controllers)
app.use('/api', apiRouter);


//Definicion de puerto
app.set('PORT', process.env.PORT || 3000);



app.get('/', function(req, res) {
    console.log("Estructura base del proyecto backend");
    res.send("Estructura base del proyecto backend");
});

app.listen(app.get('PORT'), () => {
    console.log(`Running on http://localhost:${app.get('PORT')}`)
})

module.exports = app;