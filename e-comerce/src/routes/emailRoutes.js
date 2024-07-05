const Router= require('express');
const router = Router();
// Ruta de prueba para enviar correo electrónico
router.post('/test-email', async (req, res) => {
    const { to, subject, text } = req.body;
    try {
        await emailService.sendEmail(to, subject, text);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email');
    }
});

module.exports = router;