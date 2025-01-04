export const RESET_PASSWORD_EMAIL_TEMPLATE = `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Restablece tu contraseña</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1c2434; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Restablecimiento de contraseña</h1>
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <p>Hola,</p>
                <p>Hemos recibido una solicitud para restablecer tu contraseña. Si no realizaste esta solicitud, por favor ignora este correo.</p>
                <p>Para restablecer tu contraseña, haz clic en el botón a continuación:</p>
                <div style="text-align: center; margin: 30px 0;">
                <a href="{resetURL}" style="background-color: #1c2434; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Restablecer contraseña</a>
                </div>
                <p>Este enlace expirará en 1 hora por razones de seguridad.</p>
                <p>Saludos cordiales,<br><p style="font-weight: bold; color: #1c2434">Tupperware Team</p></p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
                <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
            </div>
        </body>
    </html>
`
