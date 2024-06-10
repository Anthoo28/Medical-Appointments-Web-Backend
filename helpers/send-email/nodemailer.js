// helpers/emailHelper.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const enviarCorreo = (userEmail, appointment) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: '¡Tu cita ha sido confirmada!',
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 40px;
                            border-radius: 5px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        }
                        .title {
                            font-size: 24px;
                            margin-bottom: 20px;
                        }
                        .info {
                            margin-bottom: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1 class="title">¡Tu cita ha sido confirmada!</h1>
                        <p class="info">¡Hola!</p>
                        <p class="info">Estamos emocionados de confirmar tu cita con nosotros.</p>
                        <p class="info">Fecha: ${appointment.date}</p>
                        <p class="info">Hora: ${appointment.time}</p>
                        <p class="info">Esperamos verte pronto. ¡No dudes en contactarnos si tienes alguna pregunta!</p>
                        <p class="info">Saludos cordiales,</p>
                        <p class="info">Vital Core</p>
                    </div>
                </body>
            </html>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Correo enviado: ' + info.response);
    });
};



module.exports = { enviarCorreo };
