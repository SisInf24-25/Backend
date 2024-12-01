const nodemailer = require('nodemailer');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// Configura el transporte
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Cambia esto al servidor SMTP que uses
    port: 465, // Puerto (generalmente 465 para SSL, 587 para STARTTLS)
    secure: true, // true para SSL, false para otros
    auth: {
        user: process.env.MAIL_USER, // Tu dirección de correo
        pass: process.env.MAIL_PASS // Tu contraseña o token de aplicación
    }
});

// Función para enviar el correo
const enviarCorreoPlano = async (destinatario, asunto, texto) => {
    try {
        const info = await transporter.sendMail({
            from: `"Casas rurales" <${process.env.MAIL_PASS}`, // Dirección del remitente
            to: destinatario, // Lista de destinatarios
            subject: asunto, // Asunto del correo
            text: texto, // Cuerpo del correo (texto plano)
        });
        console.log('Correo enviado: %s', info.messageId);
    } catch (error) {
        console.error('Error enviando correo:', error);
    }
};

const enviarCorreoHTML = async (destinatario, asunto, texto) => {
    try {
        const info = await transporter.sendMail({
            from: `"Casas rurales" <${process.env.MAIL_PASS}`, // Dirección del remitente
            to: destinatario, // Lista de destinatarios
            subject: asunto, // Asunto del correo
            html: texto // Cuerpo del correo (HTML)
        });
        console.log('Correo enviado: %s', info.messageId);
    } catch (error) {
        console.error('Error enviando correo:', error);
    }
};

// Exportar la función
module.exports = { enviarCorreoPlano, enviarCorreoHTML };
