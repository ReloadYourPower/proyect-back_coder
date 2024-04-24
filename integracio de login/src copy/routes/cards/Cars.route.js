const  { Router } = require('express');
const router = Router();
const CardManager = require('./cars');

const cardManager = new CardManager(); // Crea una instancia del CardManager

router.post('/create', (req, res) => {
    try {
        const newCard = cardManager.createCard(); // Invoca el método createCard()
        res.status(200).json({ message: 'Carrito creado correctamente', card: newCard });
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

module.exports = router;
