export const SUCCESS_PASSWORD_RESET_TEMPLATE = `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Restablecimiento de contraseña exitoso</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1c2434; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Restablecimiento de contraseña exitoso</h1>
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <p>Hola,</p>
                <p>Te escribimos para confirmar que tu contraseña ha sido restablecida con éxito.</p>
                <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #1c2434; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
                    ✓
                </div>
                </div>
                <p>Si no solicitaste este restablecimiento de contraseña, por favor contacta a nuestro equipo de soporte de inmediato.</p>
                <p>Por razones de seguridad, te recomendamos:</p>
                <ul>
                <li>Usar una contraseña segura y única</li>
                <li>Habilitar la autenticación en dos pasos si está disponible</li>
                <li>Evitar reutilizar la misma contraseña en varios sitios</li>
                </ul>
                <p>Gracias por ayudarnos a mantener tu cuenta segura.</p>
                <p>Saludos cordiales,<br><p style="font-weight: bold; color: #1c2434">Tupperware Team</p></p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
                <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
            </div>
        </body>
    </html>
`
