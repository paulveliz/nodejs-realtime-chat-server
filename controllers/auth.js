const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJTW } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if( existeEmail ) return res.status(400).json({
            ok: false,
            msg: 'El correo ya esta registrado.'
        });
        const usuario = new Usuario( req.body );
        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        await usuario.save();

        // Generar JWT.
        const token = await generarJTW( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador.'
        });
    }

}

module.exports = {
    crearUsuario
}