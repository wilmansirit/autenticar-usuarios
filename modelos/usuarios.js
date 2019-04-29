'use strict'

const mongoose		= require('mongoose')
	,	Schema		= mongoose.Schema
	,	bcrypt		= require('bcrypt')

const usuarioSchema	= new Schema({
		email		: {type: String, unique: true, lowercase: true, required: true},
		password	: {type: String, required: true},
		nombre		: {type: String, required: true}
	}, {
		timestamps	: true
	});

// Agregando métodos al Schema

// El método "pre" se activa antes de guardar en base de datos las credenciales del usuario
usuarioSchema.pre('save', function(next) {
	const usuario = this;
	
	if( !usuario.isModified('password')) return next();	
	
	// Encriptar las contraseñas. Primero generar la SALT para prevenir ataques de diccionario
	bcrypt.genSalt(10, (err, salt) => {
		// Si ocurre un error al generar la salt
		if(err) return next();
		
		bcrypt.hash(usuario.password, salt, null, (err, hash) => {
			// Si ocurre un error
			if (err) return next();
			// Si todo va bien, guardamos en el objeto usuario la clave encriptada
			usuario.password = hash;
			next();
		})
	});
});

// Agregar nuevo método para comparar el password
usuarioSchema.methods.compararPassword = function(password, callBack) {

	bcrypt.compare(password, this.password, (err, sonIguales) => {
		// Si ocurre un error
		if (err) callBack(err);

		callBack(null, sonIguales);
	})
}


module.exports = mongoose.model('Usuario', usuarioSchema);