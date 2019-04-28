'use strict'

/* PERSISTENCIA DE SESIONES CON MONGODB, MySQL
Uso de mongodb, mysql para el almacenamiento de sesiones

Ver más en: 
	https: //www.youtube.com/watch?v=DS-TST4FW2k
	http: //www.cleverclouds.im/es/blog/2018/06/guardar-la-sesi%C3%B3n-en-mysql-para-el-framework-express-en-node
	*/

const 	express 	= require('express')
	,	session		= require('express-session')
	,	MongoStore	= require('connect-mongo')(session)				// Para almacenar las sesiones con mogodb
	,	MySQLStore	= require('express-mysql-session')(session)		// Para Almacenar las Sesiones con MySQL

require('dotenv').config()

// const MONGO_URL = 'mongodb://127.0.0.1:27017/sesiones-cookies'

const app = express();

app.use(session({
	secret				:	'ESTO ES UN SECRETO',
	resave				:	true,					// Forzar a cada llama de sesion se guarde en base de datos haya cambios o no
	saveUninitialized	:	true,					// Cada session es un objeto donde se le agregan propiedades que contiene información de la session
													// (quien es el usuario, etc.). Al iniciar está vacío y con true forzamos a guardarlo en base de datos
	// store				:	new MongoStore({		// Para almacenar en base de datos las sesiones 
	// 	url				:	MONGO_URL,				// Nombre de la base de datos a almacenar las sesiones
	// 	autoReconnect	:	true					// Auto reconexión en caso de fallar
	// })
	store				:	new MySQLStore({		// Uso de MySQL para el almacenamiento de las sesiones
		host			:	'localhost',
		port			:	3306,
		user			:	process.env.LOCAL_USERNAME,
		password		:	process.env.LOCAL_PASSWORD,
		database		:	process.env.LOCAL_DATABASE
	})
}))

app.get('/', (req, res) => {
	req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
	res.send(`Hola!. Has visto esta página ${req.session.cuenta}`)
})



app.listen(3000, () => {
	console.log('Server running on port 3000');	
});

