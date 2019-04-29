'use strict'

/* 
	Autenticación de usuarios con Node.js
*/

const 	express 	= require('express')
	,	session		= require('express-session')
	,	MongoStore	= require('connect-mongo')(session)				// Para almacenar las sesiones con mogodb
	,	mongoose	= require('mongoose')

require('dotenv').config()

// Configuramdo mongoose
const MONGO_URL = 'mongodb://127.0.0.1:27017/sesiones-cookies'
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URL, { 
	useNewUrlParser	: 	true,
	useCreateIndex	:	true,
	useFindAndModify: 	true
});


mongoose.connection.on('error', err => {
	console.log(err);
	process.exit(1);
})


app.use(session({
	secret				:	'ESTO ES UN SECRETO',
	resave				:	true,					// Forzar a cada llama de sesion se guarde en base de datos haya cambios o no
	saveUninitialized	:	true,					// Cada session es un objeto donde se le agregan propiedades que contiene información de la session
													// (quien es el usuario, etc.). Al iniciar está vacío y con true forzamos a guardarlo en base de datos
	store				:	new MongoStore({		// Para almacenar en base de datos las sesiones 
		url				:	MONGO_URL,				// Nombre de la base de datos a almacenar las sesiones
		autoReconnect	:	true					// Auto reconexión en caso de fallar
	})
}))

app.get('/', (req, res) => {
	req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
	res.send(`Hola!. Has visto esta página ${req.session.cuenta}`)
})



app.listen(3000, () => {
	console.log('Server running on port 3000');	
});

