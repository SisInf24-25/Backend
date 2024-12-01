const { enviarCorreoHTML } = require("../services/mail");
const BookModel = require("../models/bookModel");
const HouseModel = require("../models/houseModel");

exports.createBook = async (req, res) => {
    const { guests_number, house_id, date_in, date_out } = req.body;

    if (!guests_number || !house_id || !date_in || !date_out) {
        return res.status(400).json({ 
            error: "Missing fields" 
        });
    }

    try {
        const user = await BookModel.createBook(req.session.user.user_id, guests_number, 
                                                    house_id, date_in, date_out);
        const house = await HouseModel.getHouseById(house_id);

        try {
            const asunto = "CONFIRMACIÓN RESERVA CASA RURAL"
            const mensaje = `<!DOCTYPE html>
                            <html lang="es">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Confirmación de Reserva</title>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        line-height: 1.6;
                                        color: #333;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .container {
                                        max-width: 600px;
                                        margin: 20px auto;
                                        padding: 20px;
                                        border: 1px solid #ddd;
                                        border-radius: 5px;
                                        background-color: #f9f9f9;
                                    }
                                    h1 {
                                        color: #4CAF50;
                                        font-size: 24px;
                                    }
                                    p {
                                        margin: 10px 0;
                                    }
                                    .footer {
                                        margin-top: 20px;
                                        font-size: 12px;
                                        color: #777;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <h1>Confirmación de Reserva</h1>
                                    <p>Estimado <strong>${user.nombre} ${user.lastname}</strong>,</p>
                                    <p>
                                        Le confirmamos que su reserva de la casa <strong>${house.title}</strong> 
                                        con fecha de entrada <strong>${date_in}</strong> y fecha de salida <strong>${date_out}</strong> 
                                        se ha realizado correctamente.
                                    </p>
                                    <p>
                                        Esperamos que la estancia sea de su agrado y agradecemos su confianza en 
                                        <strong>Casas Rurales</strong>.
                                    </p>
                                    <p>Atentamente,</p>
                                    <p>El equipo de Casas Rurales</p>
                                    <div class="footer">
                                        <p>Este correo es informativo y no requiere respuesta.</p>
                                    </div>
                                </div>
                            </body>
                            </html>`
            await enviarCorreoHTML(user.mail, asunto, mensaje);
            console.log('Correo enviado correctamente');
        } catch (error) {
            console.log('Error al enviar el correo');
        }
        res.status(200).json({
            book: book
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.getBooksOfOwner = async (req, res) => {
    try {

        const books = await BookModel.getBooksOfOwner(req.session.user.user_id);
        res.status(200).json({
            books: books
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
