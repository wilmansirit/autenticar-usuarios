'use strict'

const Usuario = require('../modelos/usuarios');


const user = new Usuario({
	email		:	'wsirit@gmail.com',
	password	:	'123456',
	nombre		:	'Wilman Sirit'
})

user.save()
	.then( _ => console.log('El usuario ha sido guardado'))
	.catch( err => console.log(err) )