const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
    const { name, lastname, username, mail, number, password, type } = req.body;

    try {
        const existingUser = await UserModel.getUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ 
                error: "Existing username"
            });
        }
        
        const existingMail = await UserModel.getUserByMail(mail);
        if (existingMail) {
            return res.status(409).json({ 
                error: "Existing email"
            });
        }

        if (type != '1' && type != '2') {
            return res.status(400).json({ 
                error: "Incorrect type"
            });
        }

        const user_id = await UserModel.createUser(name, lastname, username, mail, number, password, type);
        // Enviar sesión
        res.status(200).json({
            message: "OK"
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ 
                error: "Usuario no encontrado"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                error: "Contraseña incorrecta"
            });
        } else {
            switch(user.type) {
                case '0':
                    req.session.user = { user_id: user.id, role: 'admin' };
                    break;
                case '1':
                    req.session.user = { user_id: user.id, role: 'owner' };
                    break;
                case '2':
                    req.session.user = { user_id: user.id, role: 'guest' };
                    break;
            }
        }

        res.status(200).json({ 
            user: { user_id: req.session.user.user_id, username, role: req.session.user.role }
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        // Control campos vacíos
    }
};

exports.logout = async (req, res) => {
    req.session.reset();
    res.status(200).send();
};

// Editar
exports.profile = async (req, res) => {
    const { user_id } = req.session.user;

    try {
        const user = await UserModel.getUserById(user_id);
        return res.status(200).json({
            username: user.username,
            mail: user.mail,
            img: user.img
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

};

// Editar
exports.anyUserProfile = async (req, res) => {
    const boolAuthenticated = req.hasSession;
    const { other_id } = req.params;

    try {
        respuesta = {};
        const user = await UserModel.getUserById(other_id);
        const colecciones = await ColeccionesModel.getUserCollections(other_id);

        //id, username, img, colecciones
        respuesta.id = user.id;
        respuesta.username = user.username;
        respuesta.img = user.img;
        respuesta.colecciones = colecciones;

        if (boolAuthenticated) {
            const { user_id } = req.session.user;
            var estado = 1;
            if (await AmistadModel.hayAmistad(user_id, other_id)) {
                estado = 0;
            } else if (await AmistadModel.hayPeticionPendienteEnviada(user_id, other_id)) {
                estado = 2;
            } else if (await AmistadModel.hayPeticionPendienteRecibida(user_id, other_id)) {
                estado = 3;
            }
            respuesta.estado = estado;
        }
        if (estado == 0) {
            respuesta.ultimo = await MarcapaginasModel.getUltimoAudiolibro(other_id);
        }
        return res.status(200).json(
            respuesta
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
