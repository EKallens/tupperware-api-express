export const VERIFICATION_EMAIL_TEMPLATE = `
    <!DOCTYPE html>
    <html lang="es">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verifica tu correo electrónico</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1c2434; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Verifica tu correo electrónico</h1>
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <p>Hola!</p>
                <p>¡Gracias por registrarte! Tu código de verificación es:</p>
                <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1c2434;">{verificationCode}</span>
                </div>
                <p>Ingresa este código en la página de verificación para completar tu registro.</p>
                <p>Por razones de seguridad, este código expirará en 15 minutos.</p>
                <p>Si no creaste una cuenta con nosotros, por favor ignora este correo.</p>
                <p>Saludos cordiales,<br><p style="font-weight: bold; color: #1c2434">Tupperware Team</p></p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
                <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
            </div>
        </body>
    </html>
`
